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

  sendProductList(): void | undefined {
    const cart: IProductCart[] = JSON.parse(
      localStorage.getItem("@fastbusines:cart")!
    );

    if (!cart) {
      return;
    }

    const productList = cart
      .map((el) => `${el.name} - ${el.count}`)
      .join("%0A");

    const urlBase =
      "https://api.whatsapp.com/send?phone=+55++98981464032&text=";

    const message =
      "*FAST BUSINES PEDIDO*%0D%0A" +
      "----------------Produtos----------------%0D%0A" +
      `${productList}%0A%0A` +
      "--------------------------------------------%0D%0A" +
      `Total: ${this.cartService
        .getSumTotalProducts()
        .toLocaleString("BR", { style: "currency", currency: "BRL" })}`;

    window.open(`${urlBase}${message}`, "_blank");
    this.productsList = [];
    this.cartService.clearCart();
  }
}
