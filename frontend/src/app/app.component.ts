import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupService } from './core/services/popup.service';
import { ErrorPopupComponent } from "./shared/components/error-popup/error-popup.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private popupService = inject(PopupService)
  messageError = signal<string | null>(null)

  ngOnInit(): void {
    this.popupService.error$.subscribe(message => {
      if (!this.messageError()) {
        this.messageError.set(message)
        setTimeout(() => {
          this.messageError.set(null)
        }, 4000);
      }
    });
  }
}
