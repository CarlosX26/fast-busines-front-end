import { Injectable } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
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

  sumTotalProducts: BehaviorSubject<number> = new BehaviorSubject(
    this.getSumTotalProducts()
  );
  sumTotalProducts$: Observable<number> = this.sumTotalProducts.asObservable();

  constructor(private toast: HotToastService) {}

  addProduct(product: IProduct): void {
    const productInCartIndex = this.cart.findIndex((p) => p.id === product.id);

    if (productInCartIndex > -1) {
      this.cart[productInCartIndex].count++;
      if (this.cart[productInCartIndex].count > product.stock) {
        this.toast.warning("Produto atingiu estoque máximo!");
        this.cart[productInCartIndex].count = product.stock;
      }
    } else {
      this.toast.success("Produto adicionado :)");
      this.cart.push({ ...product, count: 1 });
    }

    this.countProductsInCart.next(this.countProducts());
    this.sumTotalProducts.next(this.getSumTotalProducts());
    localStorage.setItem("@fastbusines:cart", JSON.stringify(this.cart));
  }

  updateProduct(product: IProductCart, count: number): void | null {
    const productInCartIndex = this.cart.findIndex((p) => p.id === product.id);

    this.cart[productInCartIndex].count += count;

    if (product.stock < product.count) {
      this.toast.warning("Produto atingiu estoque máximo!");
      this.cart[productInCartIndex].count = product.stock;
    }
    if (this.cart[productInCartIndex].count < 1) {
      this.toast.warning("Quantidade mínima permitida!");
      this.cart[productInCartIndex].count = 1;
    }

    this.countProductsInCart.next(this.countProducts());
    this.sumTotalProducts.next(this.getSumTotalProducts());
    localStorage.setItem("@fastbusines:cart", JSON.stringify(this.cart));
  }

  countProducts(): number {
    return this.cart.reduce((acc, acv) => acc + acv.count, 0);
  }

  getProducts(): IProductCart[] {
    return this.cart;
  }

  getSumTotalProducts(): number {
    return this.cart.reduce((acc, acv) => {
      acc += Number(acv.price) * acv.count;
      return acc;
    }, 0);
  }

  removeProduct(product: IProductCart): void {
    const productInCartIndex = this.cart.findIndex((p) => p.id === product.id);

    this.cart.splice(productInCartIndex, 1);
    this.countProductsInCart.next(this.countProducts());
    this.sumTotalProducts.next(this.getSumTotalProducts());
    localStorage.setItem("@fastbusines:cart", JSON.stringify(this.cart));
  }

  clearCart(): void {
    this.cart = [];
    this.countProductsInCart.next(this.countProducts());
    this.sumTotalProducts.next(this.getSumTotalProducts());
    localStorage.setItem("@fastbusines:cart", JSON.stringify(this.cart));
  }
}
