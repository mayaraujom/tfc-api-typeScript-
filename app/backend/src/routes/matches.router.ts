import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/matches', matchesController.getMatchesByProgress);
matchesRouter.get('/matches', matchesController.getAllMatches);

export default matchesRouter;
