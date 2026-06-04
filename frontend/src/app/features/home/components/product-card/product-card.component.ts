import { Component, input, computed, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Product } from '../../../../core/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import '@tailwindplus/elements';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductCardComponent {
  product = input.required<Product>();
  
  // State for the drawer's image gallery
  selectedImageIndex = signal(0);

  productImage = computed(() => {
    const files = this.product().files;
    return (files && files.length > 0)
      ? files[0]
      : `https://placehold.co/600x400/222222/FFFFFF?text=${encodeURIComponent(this.product().name)}`;
  });

  drawerImages = computed(() => {
    const files = this.product().files || [];
    if (files.length === 0) {
      return [`https://placehold.co/600x400/222222/FFFFFF?text=${encodeURIComponent(this.product().name)}`];
    }
    return files.slice(0, 5); // Max 5 images
  });

  currentDrawerImage = computed(() => this.drawerImages()[this.selectedImageIndex()]);

  isLowStock = computed(() => this.product().quantity > 0 && this.product().quantity < 5);
  isOutOfStock = computed(() => this.product().quantity === 0);

  selectImage(index: number) {
    this.selectedImageIndex.set(index);
  }
}
