import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth-state.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authStateService = inject(AuthStateService);
  user = this.authStateService.currentUser;
  isAuthenticated = this.authStateService.isAuthenticated;

  logout() {
    this.authStateService.logout();
  }
}
