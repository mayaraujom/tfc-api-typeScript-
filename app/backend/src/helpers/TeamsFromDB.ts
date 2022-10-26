import { QueryTypes } from 'sequelize';
import IQuery from '../interfaces/IQuery';
import db from '../database/models';
import { homeQuery, awayQuery } from './queries';

export default class TeamsFromDB {
  public getTeamsFromDB = async (typ: string) => {
    let results: IQuery[] = [];
    if (typ === 'home') {
      results = await db.query(homeQuery, { type: QueryTypes.SELECT });
    }
    if (typ === 'away') {
      results = await db.query(awayQuery, { type: QueryTypes.SELECT });
    }
    return results;
  };
}
