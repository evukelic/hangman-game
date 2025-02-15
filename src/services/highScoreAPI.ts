import { AxiosResponse } from "axios";

import BaseAPI from "./baseAPI";

const HIGH_SCORE_BASE_URL =
  "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task";

export interface HighScoreModel {
  readonly quoteId: string;
  readonly userName: string;
  readonly uniqueCharacters: number;
  readonly length: number;
  readonly errors: number;
  readonly duration: number;
}

class HighScoreAPI extends BaseAPI {
  private static _instance: HighScoreAPI;

  private constructor() {
    super();
    this.setNoAuthProxy(HIGH_SCORE_BASE_URL);
  }

  public static get Instance(): HighScoreAPI {
    return this._instance || (this._instance = new this());
  }

  public getHighScores(): Promise<AxiosResponse<HighScoreModel[]>> {
    return this.instance.get<HighScoreModel[]>("/highscores");
  }

  public sendScore(
    params: HighScoreModel
  ): Promise<AxiosResponse<HighScoreModel>> {
    return this.instance.post<HighScoreModel>("/highscores", params);
  }
}

export default HighScoreAPI.Instance;
