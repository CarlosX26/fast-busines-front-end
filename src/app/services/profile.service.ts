import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Api } from "./api";

interface IProfileResponse {
  id: number;
  first_name: string;
  email: string;
}

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<IProfileResponse> {
    return this.http.get<IProfileResponse>(`${Api.baseUrl}/profile/`);
  }
}
