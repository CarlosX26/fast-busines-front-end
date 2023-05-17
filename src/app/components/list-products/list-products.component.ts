import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct, ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-list-products",
  templateUrl: "./list-products.component.html",
  styleUrls: ["./list-products.component.css"],
})
export class ListProductsComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}

  productList: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  productName: string = "";

  nextPage: number | null = 1;
  observer: IntersectionObserver = new IntersectionObserver(
    ([{ isIntersecting }]) => {
      if (isIntersecting && this.nextPage) {
        this.loadNextPage();
      }
    }
  );

  loadNextPage(): void {
    this.productService.getProducts(this.nextPage!).subscribe((data) => {
      if (data.next) {
        this.nextPage! += 1;
      } else {
        this.nextPage = null;
      }

      this.productList = [...this.productList, ...data.results];
      this.filteredProducts = this.productList;
    });
  }

  ngOnInit(): void {
    this.observer.observe(document.getElementById("more")!);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  searchProduct(): void {
    const product = this.productName.trim().toLowerCase();

    this.filteredProducts = this.productList.filter((p) => {
      if (!product) {
        return true;
      }

      return p.name.toLowerCase().includes(product);
    });
  }
}
