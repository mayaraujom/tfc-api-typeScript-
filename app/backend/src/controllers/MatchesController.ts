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

  public getMatchesByProgress = async (req: Request, res: Response) => {
    const progress = req.query.inProgress;
    console.log(progress);

    if (!progress) {
      return this.getAllMatches(req, res);
    }

    let progressBoolean;
    if (progress === 'true') {
      progressBoolean = true;
    } else {
      progressBoolean = false;
    }
    const matches = await this._matchesService.getMatchesByProgress(progressBoolean);

    return res.status(200).json(matches);
  };

  public createMatch = async (req: Request, res: Response) => {
    const match = await this._matchesService.createMatch(req.body);
    console.log(match);

    return res.status(201).json(match);
  };
}
