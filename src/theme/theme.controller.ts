import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ThemeEntity, ThemeRequest } from './theme.entity';
import { ThemeService } from './theme.service';

@ApiTags('themes')
@Controller('themes')
export class ThemeController {
  constructor(private themeService: ThemeService) {}

  @Get(':id')
  async getTheme(@Param('id') id: string): Promise<ThemeEntity> {
    return await this.themeService.getTheme(id);
  }

  @Post()
  async createTheme(@Body() theme: ThemeRequest): Promise<ThemeEntity> {
    return await this.themeService.createTheme(theme);
  }
}
