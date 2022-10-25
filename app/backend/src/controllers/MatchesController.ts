import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor() {
    this._matchesService = new MatchesService();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    const matches = await this._matchesService.getAllMatches();

    return res.status(200).json(matches);
  };
}
