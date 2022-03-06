import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { NominationEntity } from '../nomination/nomination.entity';
import { NominateBookRequest, Book, BookEntity, ExternalBookEntity } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(NominationEntity)
    private nominationRepository: Repository<NominationEntity>,
    private httpService: HttpService,
  ) {}

  async getBooks(themeId: string): Promise<Book[]> {
    const nominations: NominationEntity[] =
      await this.nominationRepository.find({ themeId: themeId });
    console.log(`Nominations: ${JSON.stringify(nominations)}`);

    const books: any[] = [];
    for (const nomination of nominations) {
      const book = await this.bookRepository.findOne({ id: nomination.bookId });
      if (book) {
        const externalBookData = await this.getExternalBook(book.workId);
        books.push({ externalBookData, nomination, book });
      }
    }

    return books;
  }

  private async getExternalBook(workId: string): Promise<any> {
    return lastValueFrom(
      this.httpService
        .get<any>(`https://openlibrary.org/works/${workId}.json`)
        .pipe(
          map((res) => {
            return res.data;
          }),
        ),
    );
  }

  async nominateBook(addBookRequest: NominateBookRequest): Promise<Book> {
    // todo: throw an error if the nomination phase is closed?

    const result: Book = {
      book: undefined,
      externalBookData: undefined,
      nomination: undefined,
    };

    // check to see if book exists
    const existingBook = await this.bookRepository.findOne({
      where: { workId: addBookRequest.workId },
    });
    console.log(`existing book: ${JSON.stringify(existingBook)}`);

    if (!existingBook) {
      const newBook = await this.bookRepository.create({
        isbn: addBookRequest.isbn,
        workId: addBookRequest.workId,
        triggerWarnings: addBookRequest.triggerWarnings,
      });
      result.book = newBook;
      console.log(`new book: ${JSON.stringify(newBook)}`);

      await this.bookRepository.save(newBook);
    } else {
      result.book = existingBook;
    }

    result.externalBookData = await this.getExternalBook(result.book.workId);
    console.log(`external Book data: ${result.externalBookData}`);

    // create new nomination entry
    // see if nomination already exists
    const existingNomination = await this.nominationRepository.findOne({
      where: { themeId: addBookRequest.themeId, bookId: result.book.id },
    });
    console.log(`existing nomination: ${JSON.stringify(existingNomination)}`);

    if (!existingNomination) {
      const newNomination: NominationEntity =
        await this.nominationRepository.create({
          themeId: addBookRequest.themeId,
          bookId: result.book.id,
          nominatorId: addBookRequest.nominatorId,
        });
      result.nomination = newNomination;
      console.log(`new nomination: ${JSON.stringify(newNomination)}`);
      await this.nominationRepository.save(newNomination);
    } else {
      result.nomination = existingNomination;
      // todo: throw error if it already exists??
    }
    return result;
  }
}
