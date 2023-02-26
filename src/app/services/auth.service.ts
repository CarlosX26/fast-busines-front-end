import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login, Register } from "../models/auth";

interface ILoginResponse {
  refresh: string;
  access: string;
}
interface IRegisterResponse {
  id: number;
  first_name: string;
  email: string;
  is_superuser: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl: string = "http://localhost:8000/api";
  headers: {
    "Content-Type": string;
  } = {
    "Content-Type": "application/json",
  };

  constructor(private http: HttpClient) {}

  login(data: Login): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${this.baseUrl}/users/login/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }

  register(data: Register): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(
      `${this.baseUrl}/users/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }
}
