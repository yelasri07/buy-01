import { Component, EventEmitter, HostListener, input, Output } from '@angular/core';

@Component({
  selector: 'app-product-options',
  imports: [],
  templateUrl: './product-options.component.html',
  styleUrl: './product-options.component.scss'
})
export class ProductOptionsComponent {
  @Output()
  hide = new EventEmitter()

  productId = input.required<string>()

  updateProduct() {
    console.log(this.productId());
  }

  deleteProduct() {
    console.log(this.productId());
  }

  @HostListener('document:click')
  hideOptions() {
    this.hide.emit()
  }
}
