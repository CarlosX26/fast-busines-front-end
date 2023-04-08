import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Api } from "./api";

export interface IProfileResponse {
  id: number;
  first_name: string;
  email: string;
}

export interface IProfileUpdate {
  first_name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<IProfileResponse> {
    const token = JSON.parse(localStorage.getItem("@fastbusines:access")!);
    return this.http.get<IProfileResponse>(`${Api.baseUrl}/users/profile/`, {
      headers: { ...Api.headers, Authorization: `Bearer ${token}` },
    });
  }

  updateProfile(data: IProfileUpdate, userId: number) {
    const token = JSON.parse(localStorage.getItem("@fastbusines:access")!);
    return this.http.patch<IProfileResponse>(
      `${Api.baseUrl}/users/${userId}/`,
      JSON.stringify(data),
      {
        headers: { ...Api.headers, Authorization: `Bearer ${token}` },
      }
    );
  }
}
