import { Observable } from "rxjs";
import { Api } from "./api";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface IProduct {
  id: number;
  img_url: string;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  user_id: number;
}

interface IProductsResponse {
  count: number;
  next: string | string;
  previous: string | null;
  results: IProduct[];
}

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(pageNumber: number = 1): Observable<IProductsResponse> {
    const page = `?page=${pageNumber}`;
    return this.http.get<IProductsResponse>(`${Api.baseUrl}/products/${page}`, {
      headers: { ...Api.headers },
    });
  }

  getProductById(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${Api.baseUrl}/products/${productId}/`, {
      headers: { ...Api.headers },
    });
  }
}
