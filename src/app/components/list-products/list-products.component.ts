import { Component, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { IProduct, ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-list-products",
  templateUrl: "./list-products.component.html",
  styleUrls: ["./list-products.component.css"],
})
export class ListProductsComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}

  productList: IProduct[] = [];
  nextPage: number | null = 1;
  observer: IntersectionObserver = new IntersectionObserver(
    ([{ isIntersecting }]) => {
      if (isIntersecting && this.nextPage) {
        this.productService.getProducts(this.nextPage).subscribe((data) => {
          if (data.next) {
            this.nextPage! += 1;
          } else {
            this.nextPage = null;
          }

          this.productList = [...this.productList, ...data.results];
        });
      }
    }
  );

  ngOnInit(): void {
    this.observer.observe(document.getElementById("more")!);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
