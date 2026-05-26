import { Component, EventEmitter, inject, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { MediaService } from '../../../core/services/media.service';
import { Confirmable } from '../../decorators/confirmable.decorator';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService)
  private mediaService = inject(MediaService)

  @Output()
  close = new EventEmitter()

  media = signal<{ url: string, file: File }[]>([])

  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl<any>(''),
    quantity: new FormControl('')
  })

  ngOnInit(): void {
    document.body.classList.add('overflow-hidden');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('overflow-hidden');
  }

  onSubmit() {
    if (this.price.value && !isNaN(this.price.value)) {
      this.price.setValue(parseFloat(this.price.value).toFixed(2))
    }

    if (this.media().length === 0) return;

    this.productService.submitProduct(this.productForm.value).subscribe({
      next: res => {
        console.log(res)

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

  closeModal() {
    let needConfirm = false
    Object.values(this.productForm.value).forEach(value => {
      if (value) {
        needConfirm = true
        return
      }
    })

    if (this.media().length > 0) {
      needConfirm = true
    }

    if (!needConfirm) {
      this.close.emit()
    } else {
      this.closeModalWithConfirmation()
    }
  }

  @Confirmable()
  private closeModalWithConfirmation() {
    this.close.emit()
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
