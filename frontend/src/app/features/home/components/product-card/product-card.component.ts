import { Component, input, computed, signal, inject } from '@angular/core';
import { Product } from '../../../../core/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { ProductOptionsComponent } from "../../../../shared/components/product-options/product-options.component";
import { AuthStateService } from '../../../../core/services/auth-state.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, ProductOptionsComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
  currentUser = inject(AuthStateService)

  isVisibleOptions = signal<boolean>(false);

  productImage = computed(() => {
    const files = this.product().files;
    return (files && files.length > 0)
      ? files[0]
      : `https://placehold.co/600x400/222222/FFFFFF?text=${encodeURIComponent(this.product().name)}`;
  });

  isLowStock = computed(() => this.product().quantity > 0 && this.product().quantity < 5);
  isOutOfStock = computed(() => this.product().quantity === 0);
}
