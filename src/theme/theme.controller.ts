import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  @Get(':id/books')
  async getBooks(@Param('id') id: string): Promise<Book[]> {
    return await this.bookService.getBooks(id);
  }

  @Post(':id/books')
  async nominateBook(
    @Param('id') id: string,
    @Body() book: NominateBookRequest,
  ): Promise<Book> {
    return await this.bookService.nominateBook(book);
  }
}
