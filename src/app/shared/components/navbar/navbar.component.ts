import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../interfaces/user/user-response';
import { Role } from '../../../enums/role.enum';
declare var bootstrap: any;
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  loggedInUser!: UserResponse;
  selectedImage: string | null = null;
  profileImage = signal<string>('assets/images/svg/profile.svg');
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    public userService: UserService
  ) { }

  ngOnInit() {
    const mobile = this.tokenService.getMobileNumberFromAccessToken();
    console.log('mobile....' + mobile);
    if (mobile) {
      this.userService.getUserByMobile(mobile).subscribe({
        next: (res) => {
          console.log(res);
          this.loggedInUser = res.response;
          console.log('LOGGED IN USER PROFILE IMAGE ===> ', this.loggedInUser.profileImage);
          if (!this.loggedInUser.profileImage) {
            this.loggedInUser.profileImage = 'assets/images/svg/profile.svg';
          } else {
            this.userService.updateImage(this.loggedInUser.profileImage);
          }
          console.log('LOGGED IN USER 123 => ', this.loggedInUser);
        },
        error: (err) => {
          console.error('Failed to load user', err);
          alert(err.message);
        },
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
