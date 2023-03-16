import { environment } from "../../environments/environment";

interface IHeaders {
  "Content-Type": string;
}

export class Api {
  static baseUrl: string = environment.apiUrl;
  static headers: IHeaders = {
    "Content-Type": "application/json",
  };
}
