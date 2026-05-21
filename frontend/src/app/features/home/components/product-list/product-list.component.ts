import { Component, inject, input, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  products = this.productService.products;
  loading = this.productService.loading;

  userId = input<string | undefined>(undefined)

  ngOnInit(): void {
    this.productService.resetPage();
    this.productService.loadProducts(this.userId())
  }
}
