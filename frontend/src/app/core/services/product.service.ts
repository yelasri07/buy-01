import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { API } from '../config/api';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private readonly pageSize = 6;
  private readonly _page = signal(1);
  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal(false);

  // Exposed signals
  readonly page = computed(() => this._page());
  readonly products = computed(() => this._products());
  readonly loading = computed(() => this._loading());
  readonly isFirstPage = computed(() => this._page() === 1);
  readonly isLastPage = computed(() => this._products().length < this.pageSize);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this._page.set(+params['page'] || 1);
    });
    this.loadProducts();
  }

  loadProducts() {
    this._loading.set(true);
    const params = new HttpParams()
      .set('page', (this._page() - 1).toString())
      .set('size', this.pageSize.toString());

    this.http.get<Product[]>(API.GET_POSTS, { params }).subscribe({
      next: (products) => {
        console.log(products);
        this._products.set(products);
        this._loading.set(false);
      },
      error: (err) => {
        this._loading.set(false);
        throw err;
      },
    });
  }

  nextPage() {
    if (!this.isLastPage()) {
      this._page.update((p) => p + 1);
      this.onPageChange(this._page());
      this.loadProducts();
    }
  }

  previousPage() {
    if (!this.isFirstPage()) {
      this._page.update((p) => Math.max(1, p - 1));
      this.onPageChange(this._page());
      this.loadProducts();
    }
  }

  onPageChange(newPage: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage },
      queryParamsHandling: 'merge', // preserves other params
    });
  }
}
