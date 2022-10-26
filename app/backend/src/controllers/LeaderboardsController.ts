import { Request, Response } from 'express';
import SortTeams from '../helpers/SortTeams';
import IQuery from '../interfaces/IQuery';
import LeaderboardsService from '../services/LeaderboardsService';
import TeamsFromDB from '../helpers/TeamsFromDB';

const TEAM_TYPE = {
  home: 'home',
  away: 'away',
  all: 'all',
};

export default class LeaderboardsController {
  sortHelper: SortTeams;
  getTeamsHelper: TeamsFromDB;

  constructor() {
    this.sortHelper = new SortTeams();
    this.getTeamsHelper = new TeamsFromDB();
  }

  public mapTeamsWithService = (teams: IQuery[]) => {
    const mapedTeams = teams.map((leader) =>
      new LeaderboardsService(leader as IQuery).getLeaderboards);
    return mapedTeams;
  };

  public getOrderedTeam = async (team: string) => {
    const teamsFromDB = await this.getTeamsHelper.getTeamsFromDB(team);
    const teams = this.mapTeamsWithService(teamsFromDB);
    const orderedTeams = this.sortHelper.sortTeams(teams);
    return orderedTeams;
  };

  public getHomeLeaderboards = async (req: Request, res: Response) => {
    const teams = await this.getOrderedTeam(TEAM_TYPE.home);
    return res.status(200).json(teams);
  };

  public getAwayTeamsLeaderboards = async (req: Request, res: Response) => {
    const teams = await this.getOrderedTeam(TEAM_TYPE.away);
    return res.status(200).json(teams);
  };
}
