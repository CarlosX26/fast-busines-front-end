import { Component, OnInit } from "@angular/core";
import { CartService, IProductCart } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  productsList: IProductCart[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productsList = this.cartService.cart;
  }

  increaseProduct(productId: number): void {
    this.cartService.updateProduct(productId, 1);
  }

  decrementProduct(productId: number): void {
    this.cartService.updateProduct(productId, -1);
  }
}
