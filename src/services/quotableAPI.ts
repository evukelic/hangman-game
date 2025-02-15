import { AxiosResponse } from "axios";

import BaseAPI from "./baseAPI";

const QUOTABLE_BASE_URL = "http://api.quotable.io";

export interface QuoteResponse {
  readonly _id: string;
  readonly author: string;
  readonly content: string;
  readonly length: number;
}

class QuotableAPI extends BaseAPI {
  private static _instance: QuotableAPI;

  private constructor() {
    super();
    this.setNoAuthProxy(QUOTABLE_BASE_URL);
  }

  public static get Instance(): QuotableAPI {
    return this._instance || (this._instance = new this());
  }

  public getRandomQuote(): Promise<AxiosResponse<QuoteResponse>> {
    return this.instance.get<QuoteResponse>("/random");
  }
}

export default QuotableAPI.Instance;
