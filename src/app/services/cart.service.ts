import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IProduct } from "./product.service";

export interface IProductCart extends IProduct {
  count: number;
}
@Injectable({
  providedIn: "root",
})
export class CartService {
  cart: IProductCart[] =
    JSON.parse(localStorage.getItem("@fastbusines:cart")!) || [];
  countProductsInCart: BehaviorSubject<number> = new BehaviorSubject(
    this.countProducts()
  );
  countProductsInCart$: Observable<number> =
    this.countProductsInCart.asObservable();

  constructor() {}

  addProduct(product: IProduct): void {
    const productInCartIndex = this.cart.findIndex((p) => p.id === product.id);

    if (productInCartIndex > -1) {
      this.cart[productInCartIndex].count++;
    } else {
      this.cart.push({ ...product, count: 1 });
    }

    this.countProductsInCart.next(this.countProducts());
    localStorage.setItem("@fastbusines:cart", JSON.stringify(this.cart));
  }

  updateProduct(productId: number, count: number): void | null {
    const productInCartIndex = this.cart.findIndex((p) => p.id === productId);
    this.cart[productInCartIndex].count += count;
    if (this.cart[productInCartIndex].count < 1) {
      this.cart[productInCartIndex].count = 1;
    }
    this.countProductsInCart.next(this.countProducts());
    localStorage.setItem("@fastbusines:cart", JSON.stringify(this.cart));
  }

  countProducts(): number {
    return this.cart.reduce((acc, acv) => acc + acv.count, 0);
  }

  getProducts(): IProductCart[] {
    return this.cart;
  }
}
