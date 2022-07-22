import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NominateBookRequest, Book } from '../book/book.entity';
import { BookService } from '../book/book.service';
import { ThemeEntity, ThemeRequest } from './theme.entity';
import { ThemeService } from './theme.service';

@ApiTags('themes')
@Controller('themes')
export class ThemeController {
  constructor(
    private themeService: ThemeService,
    private bookService: BookService,
  ) {}

  @Get(':id')
  async getTheme(@Param('id') id: string): Promise<ThemeEntity> {
    return await this.themeService.getTheme(id);
  }

  @Post()
  async createTheme(@Body() theme: ThemeRequest): Promise<ThemeEntity> {
    return await this.themeService.createTheme(theme);
  }

  @Put(':id')
  async updateTheme(
    @Param('id') id: string,
    @Body() theme: ThemeRequest,
  ): Promise<ThemeEntity> {
    return await this.themeService.updateTheme(id, theme);
  }

  @Delete(':id')
  async deleteTheme(@Param('id') id: string): Promise<void> {
    return await this.themeService.deleteTheme(id);
  }

  // GET/UPDATE/DELETE nominations by user ex: /books/nominate?user=123
  @Get(':id/books/nominate')
  async getNominatedBooks(
    @Param('id') id: string,
    @Query('userId') userId?: string,
  ): Promise<Book[]> {
    if (userId) {
      return await this.bookService.getNominatedBooks(userId, id);
    } else {
      return await this.bookService.getAllNominatedBooks(id);
    }
  }

  @Post(':id/books/nominate')
  async nominateBook(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() book: NominateBookRequest,
  ): Promise<Book> {
    return await this.bookService.nominateBook(book);
  }

  @Delete(':id/books/nominate')
  async deleteNomination(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Query('nominationId') nominationId: string,
  ): Promise<void> {
    return await this.bookService.deleteNominatedBook(userId, id, nominationId);
  }

  // GET/UPDATE/DELETE votes by user /books/nominate?user=123
}
