import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const AUTH_API = ''

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogged: boolean = false;

  constructor(private dataService: DataService) { }

  // login(UserName: string, Password: string): Observable<any | null> {
  //   return this.dataService.getUsers().pipe(
  //     tap((response) => console.log('Users received in AuthService:', response)),
  //     map((response: any[]) => {
  //       if (Array.isArray(response) && response.length >= 2) {
  //         const users = response[1]; 
  
  //         const user = users.find((u: any) => u.UserName === UserName && u.Password === Password);
  
  //         if (user) {
  //           this.isLogged = true;
  //           console.log('User logged in:', { UserName: user.UserName /* other necessary information */ });
  //           return user;
  //         } else {
  //           this.isLogged = false;
  //           console.log('User not found or invalid credentials');
  //           return null;
  //         }
  //       } else {
  //         console.error('Invalid response from DataService: Expected an array with at least two elements but received', response);
  //         return null;
  //       }
  //     }),
  //     catchError((error) => {
  //       console.error('Error fetching users:', error);
  //       return of(null);
  //     })
  //   );
  // }
  login(UserName: string, Password: string): Observable<any | null> {
    return this.dataService.getUsers().pipe(
      tap((response) => console.log('Users received in AuthService:', response)),
      map((response: any[]) => {
        // Check if the response is an array and has at least two elements
        if (Array.isArray(response) && response.length >= 2) {
          const users = response[1]; // Assuming users are at index 1
  
          const user = users.find((u: any) => u.UserName === UserName && u.Password === Password);
  
          if (user && user.isActive === 1) {
            // User found and isActive is 1
            this.isLogged = true;
            console.log('User logged in:', { UserName: user.UserName /* other necessary information */ });
            return user;
          } else if (user && user.isActive === 0) {
            // User found but isActive is 0, do not allow login
            console.log('User found but not active. Cannot login.');
            return 'not_approved'; // Return a special value to indicate not approved
          } else {
            // User not found or invalid credentials
            this.isLogged = false;
            console.log('User not found or invalid credentials');
            return null;
          }
        } else {
          console.error('Invalid response from DataService: Expected an array with at least two elements but received', response);
          return null;
        }
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of(null);
      })
    );
  }
  

  logout(): void {
    this.isLogged = false;
  }

  isAuthenticated(): boolean {
    return this.isLogged;
  }
}
