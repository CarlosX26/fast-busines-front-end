interface IHeaders {
  "Content-Type": string;
}

export class Api {
  // static baseUrl: string = "http://localhost:8000/api";
  static baseUrl: string = "https://fast-busines.onrender.com/api";
  static headers: IHeaders = {
    "Content-Type": "application/json",
  };
}
