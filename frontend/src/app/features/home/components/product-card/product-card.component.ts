import { Component, input, computed } from '@angular/core';
import { Product } from '../../../../core/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();

  productImage = computed(() => {
    const files = this.product().files;
    return (files && files.length > 0) 
      ? files[0] 
      : `https://placehold.co/600x400/222222/FFFFFF?text=${encodeURIComponent(this.product().name)}`;
  });

  isLowStock = computed(() => this.product().quantity > 0 && this.product().quantity < 5);
  isOutOfStock = computed(() => this.product().quantity === 0);
}
