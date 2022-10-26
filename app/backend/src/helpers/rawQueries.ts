import { QueryTypes } from 'sequelize';
import db from '../database/models';

export const rawQueries = async () => {
  const results = await db.query(
    `SELECT
        teams.team_name AS name,
        COUNT(matches.home_team_goals) AS j,
        SUM(IF(matches.home_team_goals > matches.away_team_goals, 1, 0))  AS v,
        SUM(IF(matches.home_team_goals = matches.away_team_goals, 1, 0))  AS e,
        SUM(IF(matches.home_team_goals < matches.away_team_goals, 1, 0))  AS d,
        SUM(matches.home_team_goals) AS gp,
        SUM(matches.away_team_goals) AS gc
      FROM TRYBE_FUTEBOL_CLUBE.matches AS matches
      JOIN TRYBE_FUTEBOL_CLUBE.teams AS teams
      ON matches.home_team = teams.id
      WHERE matches.in_progress='0'
      GROUP BY teams.team_name;`,
    { type: QueryTypes.SELECT },
  );
  return results;
};

export default { rawQueries };
