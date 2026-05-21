import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthStateService } from '../../core/services/auth-state.service';
import { User } from '../../core/interfaces/user.interface';
import { ProductService } from '../../core/services/product.service';
import { ProductListComponent } from "../home/components/product-list/product-list.component";
import { PaginatorComponent } from "../home/components/paginator/paginator.component";

@Component({
  selector: 'app-profile',
  imports: [ProductListComponent, PaginatorComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private authStateService = inject(AuthStateService)

  userProfile = signal<User | null>(null);
  profileError = signal("");

  ngOnInit(): void {

    // 6a0eeae05db2380921053ea1

    this.activatedRoute.paramMap.subscribe(params => {
      this.userProfile.set(null)
      const userId = params.get('id')
      if (!userId) {
        this.profileError.set("Whoops! profile not found.")
        return
      }

      this.authStateService.fetchUser(userId).subscribe({
        next: res => {
          this.profileError.set("")
          this.userProfile.set(res.user_details)
        },

        error: err => {
          if (err.status === 404) {
            this.profileError.set(err.error.message)
            return
          }

          throw err
        }
      })
    })

  }

}
