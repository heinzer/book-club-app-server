import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ThemeEntity, ThemeRequest } from './theme.entity';
import { ThemeService } from './theme.service';

@ApiTags('themes')
@Controller()
export class ThemeController {
  constructor(private themeService: ThemeService) {}

  @Get('themes')
  async getThemes(@Query('clubId') clubId: string): Promise<ThemeEntity[]> {
    return await this.themeService.getThemes(clubId);
  }

  @Get('themes/:id')
  async getTheme(@Param('id') id: string): Promise<ThemeEntity> {
    return await this.themeService.getTheme(id);
  }

  @Get('currentTheme')
  async getCurrentTheme(@Query('clubId') clubId: string): Promise<ThemeEntity> {
    return await this.themeService.getCurrentTheme(clubId);
  }

  @Post('themes')
  async createTheme(@Body() theme: ThemeRequest): Promise<ThemeEntity> {
    return await this.themeService.createTheme(theme);
  }
}
