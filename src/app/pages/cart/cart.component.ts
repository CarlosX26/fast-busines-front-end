import { Component, OnInit } from "@angular/core";
import { CartService, IProductCart } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  productsList: IProductCart[] = [];
  sumTotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productsList = this.cartService.cart;
    this.cartService.sumTotalProducts$.subscribe(
      (data) => (this.sumTotal = data)
    );
  }

  increaseProduct(product: IProductCart): void {
    this.cartService.updateProduct(product, 1);
  }

  decrementProduct(product: IProductCart): void {
    this.cartService.updateProduct(product, -1);
  }

  deleteProduct(product: IProductCart): void {
    this.cartService.removeProduct(product);
  }
}
