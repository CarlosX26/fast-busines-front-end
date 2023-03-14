import { Injectable } from "@angular/core";
import { IProduct } from "./product.service";

interface IProductCart extends IProduct {
  count: number;
}
@Injectable({
  providedIn: "root",
})
export class CartService {
  cart: IProductCart[] = [
    {
      description: null,
      id: 1,
      img_url:
        "https://i.pinimg.com/236x/61/4e/3c/614e3c99694894e5881dda883e894671.jpg",
      name: "Macbook Air",
      price: "12000.99",
      stock: 1,
      user_id: 2,
      count: 1,
    },
  ];

  constructor() {}

  addProduct(product: IProduct): void {
    const productInCartIndex = this.cart.findIndex((p) => p.id === product.id);

    if (productInCartIndex > -1) {
      this.cart[productInCartIndex].count++;
    } else {
      this.cart.push({ ...product, count: 1 });
    }

    localStorage.setItem("@fastbusines:cart", JSON.stringify(this.cart));
  }
}
