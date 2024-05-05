import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { DailyPlayers, Player, Prisma } from '@prisma/client';

@Controller('/players')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getPlayers(@Query('name') name: string): Promise<Partial<Player>[]> {
    try {
      const filters: Prisma.PlayerFindManyArgs = {
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        orderBy: {
          internationalReputation: 'desc',
        },
      };
      return await this.appService.getPlayers(filters);
    } catch (error) {
      throw new Error('Could not get players');
    }
  }

  @Get('/today-daily-players')
  async getTodayDailyPlayers(): Promise<DailyPlayers> {
    try {
      return await this.appService.getTodayDailyPlayers();
    } catch (error) {
      throw new Error('Could not get today daily players');
    }
  }
}
