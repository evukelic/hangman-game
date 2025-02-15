import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export default abstract class BaseAPI {
  protected instance!: AxiosInstance;

  protected setNoAuthProxy(baseURL: string): void {
    this.instance = axios.create({
      baseURL,
    });

    this.interceptResponse();
  }

  private interceptResponse(): void {
    this.instance?.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        console.error(error.message);

        return Promise.reject(error);
      }
    );
  }
}
