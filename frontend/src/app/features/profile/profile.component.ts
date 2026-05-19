import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthStateService } from '../../core/services/auth-state.service';
import { User } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private authStateService = inject(AuthStateService)

  userProfile = signal<User | null>(null);

  profileError = signal("");

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      const userId = params.get('id')
      if (!userId) {
        this.profileError.set("Whoops! profile not found.")
        return
      }

      this.authStateService.fetchUser(userId).subscribe({
        next: res => {
          this.userProfile.set(res)
          console.log(this.userProfile())
        },

        error: err => {
          console.error(err)
        }
      })
    })

  }

}
