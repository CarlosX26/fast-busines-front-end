import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login, Register } from "../models/auth";
import { Api } from "./api";

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
  constructor(private http: HttpClient) {}

  login(data: Login): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${Api.baseUrl}/users/login/`,
      JSON.stringify(data),
      {
        headers: { ...Api.headers },
      }
    );
  }

  register(data: Register): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(
      `${Api.baseUrl}/users/`,
      JSON.stringify(data),
      {
        headers: { ...Api.headers },
      }
    );
  }
}
