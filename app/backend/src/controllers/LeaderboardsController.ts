import { Request, Response } from 'express';
import ILeaderboard from '../interfaces/ILeaderboard';
import IQuery from '../interfaces/IQuery';
import LeaderboardsService from '../services/LeaderboardsService';
import { rawQueries } from '../helpers/rawQueries';

export default class TeamsController {
  public firstSort = (teams: ILeaderboard[]) => {
    const byGolsSofridos = teams.sort((b, a) => {
      if (a.goalsOwn > b.goalsOwn) return 1;
      if (a.goalsOwn < b.goalsOwn) return -1;
      return 0;
    });
    const byGolsFavor = byGolsSofridos.sort((b, a) => {
      if (a.goalsFavor > b.goalsFavor) return 1;
      if (a.goalsFavor < b.goalsFavor) return -1;
      return 0;
    });
    const bySaldoGols = byGolsFavor.sort((b, a) => {
      if (a.goalsBalance > b.goalsBalance) return 1;
      if (a.goalsBalance < b.goalsBalance) return -1;
      return 0;
    });
    return bySaldoGols;
  };

  public lastSort = (teams: ILeaderboard[]) => {
    const sortByVic = teams.sort((b, a) => {
      if (a.totalVictories > b.totalVictories) return 1;
      if (a.totalVictories < b.totalVictories) return -1;
      return 0;
    });
    const sortByTotalPoints = sortByVic.sort((b, a) => {
      if (a.totalPoints > b.totalPoints) return 1;
      if (a.totalPoints < b.totalPoints) return -1;
      return 0;
    });
    return sortByTotalPoints;
  };

  public getAllLeaderboardsSorted = async (req: Request, res: Response) => {
    const leaders = await rawQueries() as IQuery[];

    const editLeards = leaders.map((leader) =>
      new LeaderboardsService(leader as IQuery).getLeaderboards);

    const result = this.lastSort(this.firstSort(editLeards));

    console.log(result);

    return res.status(200).json(result);
  };
}
