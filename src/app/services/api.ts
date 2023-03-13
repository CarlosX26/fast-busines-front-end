interface IHeaders {
  "Content-Type": string;
}

export class Api {
  static baseUrl: string = "http://localhost:8000/api";
  static headers: IHeaders = {
    "Content-Type": "application/json",
  };
}
