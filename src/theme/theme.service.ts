import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeEntity, ThemeRequest, ThemeStatus } from './theme.entity';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(ThemeEntity)
    private themeRepository: Repository<ThemeEntity>,
  ) {}

  async getThemes(clubId: string): Promise<ThemeEntity[]> {
    return await this.themeRepository.find({ clubId: clubId });
  }

  async getTheme(id: string): Promise<ThemeEntity> {
    return await this.themeRepository.findOne({ id: id });
  }

  async getCurrentTheme(clubId: string): Promise<ThemeEntity> {
    const openThemes: ThemeEntity[] = await this.themeRepository.find({ status: ThemeStatus.OPEN });
    if (openThemes.length > 1) {
      return openThemes
        .filter(theme => theme.discussionDeadline < new Date())
        .reduce(function (a, b) { return a.discussionDeadline < b.discussionDeadline ? a : b; });
    } else {
      return openThemes[0];
    }
  }

  async createTheme(themeRequest: ThemeRequest): Promise<ThemeEntity> {
    const theme = new ThemeEntity();
    Object.assign(theme, themeRequest);
    return await this.themeRepository.save(theme);
  }
}
