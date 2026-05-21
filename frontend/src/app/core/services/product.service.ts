import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { API } from '../config/api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  private readonly pageSize = 6;
  private readonly _page = signal(0);
  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal(false);

  // Exposed signals
  readonly page = computed(() => this._page());
  readonly products = computed(() => this._products());
  readonly loading = computed(() => this._loading());
  readonly isFirstPage = computed(() => this._page() === 0);
  readonly isLastPage = computed(() => this._products().length < this.pageSize);

  loadProducts(userId?: string) {
    this._loading.set(true);
    const params = new HttpParams()
      .set('page', this._page().toString())
      .set('size', this.pageSize.toString());

    this.http.get<Product[]>(!userId ? API.GET_POSTS : `${API.GET_PROFILE_POSTS}/${userId}`, { params }).subscribe({
      next: (products) => {
        this._products.set(products);
        this._loading.set(false);
        console.log(products)
      },
      error: (err) => {
        this._loading.set(false);
        throw err
      }
    });
  }

  nextPage(userId?: string) {
    if (!this.isLastPage()) {
      this._page.update(p => p + 1);
      this.loadProducts(userId);
    }
  }

  previousPage(userId?: string) {
    if (!this.isFirstPage()) {
      this._page.update(p => Math.max(0, p - 1));
      this.loadProducts(userId);
    }
  }

  resetPage() {
    this._page.set(0)
  }
}
