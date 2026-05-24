import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

  media = signal<string[]>([])

  productForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  })

  onSubmit() {
    console.log(this.productForm.controls)
  }

  onMediaChange(event: Event) {
    if (this.media().length === 4) return;

    const ipt = event.target as HTMLInputElement
    if (!ipt.files || ipt.files?.length == 0) return;
    const file = ipt.files[0]

    const objectUrl = URL.createObjectURL(file)
    this.media().push(objectUrl)

    console.log(this.media())

    ipt.value = ''
  }

  removeMedia(index: number) {
    URL.revokeObjectURL(this.media()[index])
    this.media().splice(index, 1)
  }

  get title() {
    return this.productForm.controls.title
  }

  get description() {
    return this.productForm.controls.description
  }

}
