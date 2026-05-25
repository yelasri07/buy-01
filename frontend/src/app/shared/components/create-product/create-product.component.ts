import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { MediaService } from '../../../core/services/media.service';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  private productService = inject(ProductService)
  private mediaService = inject(MediaService)

  media = signal<{ url: string, file: File }[]>([])

  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl<any>(''),
    quantity: new FormControl('')
  })

  onSubmit() {
    if (this.price.value && !isNaN(this.price.value)) {
      this.price.setValue(parseFloat(this.price.value).toFixed(2))
    }

    this.productService.submitProduct(this.productForm.value).subscribe({
      next: res => {
        console.log(res)

        if (this.media().length === 0) return;
        const files: File[] = this.media().map(m => m.file)
        this.mediaService.submitMedia(files, 'PRODUCT', res.id).subscribe({
          next: res => {
            console.log(res)
          },
          error: err => {
            throw err
          }
        })
      },
      error: err => {
        console.error(err)

        let fieldErrors = err.error?.validationErrors
        if (fieldErrors) {
          this.productForm.setErrors(fieldErrors)
          return;
        }

        throw err
      }
    })
  }

  onMediaChange(event: Event) {
    const ipt = event.target as HTMLInputElement

    if (this.media().length === 5) {
      ipt.value = ''
      return;
    };

    if (!ipt.files || ipt.files?.length == 0) return;
    const file = ipt.files[0]
    ipt.value = ''

    const objectUrl = URL.createObjectURL(file)
    this.media().push({ url: objectUrl, file: file })
  }

  removeMedia(index: number) {
    URL.revokeObjectURL(this.media()[index].url)
    this.media().splice(index, 1)
  }

  get name() {
    return this.productForm.controls.name
  }

  get description() {
    return this.productForm.controls.description
  }

  get price() {
    return this.productForm.controls.price
  }

  get quantity() {
    return this.productForm.controls.quantity
  }

}
