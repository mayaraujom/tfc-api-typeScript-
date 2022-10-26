import { Router } from 'express';
import LeaderboardsController from '../controllers/LeaderboardsController';

const leaderboardsRouter = Router();
const leaderboardsController = new LeaderboardsController();

leaderboardsRouter.get('/leaderboard/home', leaderboardsController.getAllLeaderboardsSorted);

export default leaderboardsRouter;
