import Teams from '../database/models/teams.model';

class TeamsService {
  private teamsModel;

  constructor() {
    this.teamsModel = Teams;
  }

  public getAll = async () => {
    const teams = await this.teamsModel.findAll();
    return teams;
  };
}

export default TeamsService;
