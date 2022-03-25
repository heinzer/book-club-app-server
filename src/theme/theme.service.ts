import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  getTheme,
  ThemeEntity,
  ThemeRequest,
  ThemeStatus,
} from './theme.entity';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(ThemeEntity)
    private themeRepository: Repository<ThemeEntity>,
  ) {}

  async getThemes(clubId: number): Promise<ThemeEntity[]> {
    return await this.themeRepository.find({
      clubId: clubId,
      isSoftDeleted: false,
    });
  }

  async getTheme(id: string): Promise<ThemeEntity> {
    return await getTheme(this.themeRepository, id);
  }

  async deleteTheme(id: string): Promise<void> {
    const theme = await this.getTheme(id);
    await this.themeRepository.save({
      ...theme,
      isSoftDeleted: true,
    });
  }

  /**
   * Finds the earliest open future theme.
   * @param clubId
   */
  async getCurrentTheme(clubId: number): Promise<ThemeEntity> {
    const openThemes: ThemeEntity[] = await this.themeRepository.find({
      clubId: clubId,
      status: ThemeStatus.OPEN,
      isSoftDeleted: false,
    });
    const openFutureThemes: ThemeEntity[] = openThemes.filter(
      (theme) => theme.discussionDeadline >= new Date(),
    );
    if (openFutureThemes.length > 1) {
      return openFutureThemes.reduce(function (a, b) {
        return a.discussionDeadline < b.discussionDeadline ? a : b;
      });
    } else {
      return openFutureThemes[0];
    }
  }

  async createTheme(themeRequest: ThemeRequest): Promise<ThemeEntity> {
    const theme = new ThemeEntity();
    Object.assign(theme, themeRequest);
    return await this.themeRepository.save(theme);
  }

  async updateTheme(
    id: string,
    themeRequest: ThemeRequest,
  ): Promise<ThemeEntity> {
    const themeEntity = await this.getTheme(id);
    return await this.themeRepository.save({
      ...themeEntity,
      ...themeRequest,
    });
  }
}
