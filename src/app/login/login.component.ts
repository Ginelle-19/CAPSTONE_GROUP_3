import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterModule,
  FormsModule],
  standalone: true,
})
export class LoginComponent {
  imageUrl: string = '/assets/ccjef_logo.png'
  termsAgreed: boolean = false;

  @ViewChild('UserName') UserName!: ElementRef;
  @ViewChild('Password') Password!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((queries) => {
      const logout = Boolean(queries.get('logout'));
      if (logout) {
        this.authService.logout();
        this.snackbar.open('You are now logged out.', 'Close', {duration:3000});
      }
    });
  }

  OnLoginClicked() {
    if (!this.termsAgreed) {
      console.log('Snackbar should appear');
      this.snackbar.open('You must agree to the Terms and Conditions to log in.', 'Close', { duration: 3000 });
      return;
    }
    
    const UserName = this.UserName.nativeElement.value;
    const Password = this.Password.nativeElement.value;


    this.authService.login(UserName, Password).subscribe(
      (user) => {
        if (user) {
          alert('Welcome ' + user.FirstName + '. You are logged in.');
          
  
          // Check user's access level and navigate accordingly
          switch (user.AccessLevelID) {
            case 1: // Student
              this.router.navigate(['/user-menu/user-courses']);
              break;
            case 2: // Super Admin
              this.router.navigate(['/menu/courses']);
              break;
            // Add more cases if you have additional access levels
  
            default:
              // Handle unknown access levels or navigate to a default page
              this.router.navigate(['']);
              break;
          }
        } else {
          alert('The login credentials you have entered are not correct.');
        }
      },
      (error) => {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
      }
    );
  }
}
