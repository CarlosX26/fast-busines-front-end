import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs";
import { IProduct, ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  productDetails!: IProduct;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.productService.getProductById(params.get("id")!);
        })
      )
      .subscribe((data) => {
        this.productDetails = data;
      });
  }
}
