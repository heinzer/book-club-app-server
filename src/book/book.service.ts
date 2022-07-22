import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';
import { NominationEntity } from '../nomination/nomination.entity';
import { getTheme, ThemeEntity } from '../theme/theme.entity';
import { NominateBookRequest, Book, BookEntity } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(NominationEntity)
    private nominationRepository: Repository<NominationEntity>,
    @InjectRepository(ThemeEntity)
    private themeRepository: Repository<ThemeEntity>,
    private httpService: HttpService,
  ) {}

  // gets all the nominated books for a single theme
  async getAllNominatedBooks(themeId: string): Promise<Book[]> {
    await getTheme(this.themeRepository, themeId); // validate that the theme is not soft deleted

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

  async getNominatedBooks(userId: string, themeId: string): Promise<Book[]> {
    await getTheme(this.themeRepository, themeId); // validate that the theme is not soft deleted

    const nominations: NominationEntity[] =
        await this.nominationRepository.find({ themeId: themeId, nominatorId: userId });
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

  async deleteNominatedBook(userId: string, themeId: string, nominationId: string): Promise<any> {
    return await this.nominationRepository.delete({ nominatorId: userId, themeId: themeId, id: +nominationId});
  }

  async nominateBook(addBookRequest: NominateBookRequest): Promise<Book> {
    await getTheme(this.themeRepository, addBookRequest.themeId); // validate that the theme is not soft deleted
    // todo: throw an error if the nomination phase is closed?
    // todo: limit nominations to only 3 books per theme

    const result: Book = {
      book: undefined,
      externalBookData: undefined,
      nomination: undefined,
    };

    // check to see if book exists
    const existingBook = await this.bookRepository.findOne({
      where: { workId: addBookRequest.workId },
    });

    if (!existingBook) {
      const newBook = await this.bookRepository.create({
        workId: addBookRequest.workId,
        triggerWarnings: addBookRequest.triggerWarnings,
      });
      result.book = newBook;

      await this.bookRepository.save(newBook);
    } else {
      result.book = existingBook;
    }

    result.externalBookData = await this.getExternalBook(result.book.workId);

    // create new nomination entry
    // see if nomination already exists
    const existingNomination = await this.nominationRepository.findOne({
      where: { themeId: addBookRequest.themeId, bookId: result.book.id },
    });

    if (!existingNomination) {
      const newNomination: NominationEntity =
        await this.nominationRepository.create({
          themeId: addBookRequest.themeId,
          bookId: result.book.id,
          nominatorId: addBookRequest.nominatorId,
        });
      result.nomination = newNomination;
      await this.nominationRepository.save(newNomination);
    } else {
      result.nomination = existingNomination;
    }
    return result;
  }
}
