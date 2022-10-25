import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
// import tokenValidation from '../middlewares/tokenValidation';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/matches', matchesController.getMatchesByProgress);
matchesRouter.post('/matches', matchesController.createMatch);
matchesRouter.patch('/matches/:id/finish', matchesController.updateProgress);

export default matchesRouter;
