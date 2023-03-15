import { Component, OnInit } from "@angular/core";
import { IProduct, ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-list-products",
  templateUrl: "./list-products.component.html",
  styleUrls: ["./list-products.component.css"],
})
export class ListProductsComponent implements OnInit {
  productList: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((data) => (this.productList = data.results));
  }
}
