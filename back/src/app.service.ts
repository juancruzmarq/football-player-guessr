import { Injectable } from '@nestjs/common';
import { DailyPlayers, Player, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  VERY_HARD = 'Very Hard',
}

export type DailyPlayersWithRelations = Prisma.DailyPlayersGetPayload<{
  include: {
    easyPlayer: true;
    mediumPlayer: true;
    hardPlayer: true;
    veryHardPlayer: true;
  };
}>;

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getRandomPlayer(difficulty: Difficulty): Promise<Player> {
    try {
      const players = await this.prisma.player.findMany({
        where: {
          difficulty,
        },
      });
      return players[Math.floor(Math.random() * players.length)];
    } catch (error) {
      throw new Error('Could not find player');
    }
  }

  async getRandomsPlayers(): Promise<DailyPlayersWithRelations> {
    try {
      // 1 Random easy player
      const easyPlayer = await this.getRandomPlayer(Difficulty.EASY);
      // 1 Random medium player
      const mediumPlayer = await this.getRandomPlayer(Difficulty.MEDIUM);
      // 1 Random hard player
      const hardPlayer = await this.getRandomPlayer(Difficulty.HARD);
      // 1 Random very hard player
      const veryHardPlayer = await this.getRandomPlayer(Difficulty.VERY_HARD);

      const dailyPlayers: DailyPlayersWithRelations = {
        id: 0,
        date: new Date(),
        easyPlayerId: easyPlayer.id,
        mediumPlayerId: mediumPlayer.id,
        hardPlayerId: hardPlayer.id,
        veryHardPlayerId: veryHardPlayer.id,
        easyPlayer,
        mediumPlayer,
        hardPlayer,
        veryHardPlayer,
      };

      return dailyPlayers;
    } catch (error) {
      throw new Error('Could not find players');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateTodayPlayers(): Promise<void> {
    try {
      // Get randoms players
      const { easyPlayer, mediumPlayer, hardPlayer, veryHardPlayer } =
        await this.getRandomsPlayers();

      // Create today players
      await this.prisma.dailyPlayers.create({
        data: {
          date: new Date(),
          easyPlayerId: easyPlayer.id,
          mediumPlayerId: mediumPlayer.id,
          hardPlayerId: hardPlayer.id,
          veryHardPlayerId: veryHardPlayer.id,
        },
      });

      return;
    } catch (error) {
      throw new Error('Could not generate today players');
    }
  }

  async getPlayers(
    filters: Prisma.PlayerFindManyArgs,
  ): Promise<Partial<Player>[]> {
    try {
      return this.prisma.player.findMany({
        ...filters,
        select: {
          id: true,
          name: true,
          fullName: true,
        },
      });
    } catch (error) {
      throw new Error('Could not find players');
    }
  }

  async getOnePlayer(id: number): Promise<Player> {
    try {
      return this.prisma.player.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('Could not find player');
    }
  }

  async getTodayDailyPlayers(): Promise<DailyPlayers> {
    try {
      const todayDailyPlayers = await this.prisma.dailyPlayers.findFirst({
        where: {
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
        include: {
          easyPlayer: true,
          mediumPlayer: true,
          hardPlayer: true,
          veryHardPlayer: true,
        },
      });

      if (!todayDailyPlayers) {
        await this.generateTodayPlayers();
      } else {
        return todayDailyPlayers;
      }

      const players = await this.prisma.dailyPlayers.findFirst({
        where: {
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
        include: {
          easyPlayer: true,
          mediumPlayer: true,
          hardPlayer: true,
          veryHardPlayer: true,
        },
      });

      if (!players) {
        throw new Error('Could not find today daily players');
      }

      return players;
    } catch (error) {
      throw new Error('Could not find today daily players');
    }
  }
}
