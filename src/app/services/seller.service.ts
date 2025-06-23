import { EventEmitter, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, SignUp } from '../_model/SignUp';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private http = inject(HttpClient);
  currentUser = signal<SignUp | null>(null);
  route = inject(Router)
  baseUrl = environment.apiUrl;
  loginStatus = new EventEmitter<boolean>();
  loginError = new EventEmitter<string>();


  constructor() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser.set(JSON.parse(userData));
    }
  }

  sellerSignUP(data: SignUp) {
    return this.http.post<SignUp[]>(`${this.baseUrl+'seller'}`, data).pipe(
      tap(user => {
        if (user?.length>0) {
          this.currentUser.set(user[0]);
          localStorage.setItem('user', JSON.stringify(user[0]))
          this.route.navigate(['seller-home']);
        }
        else{
        }
        
      }),
      catchError(error => {
        console.error('SignUp error:', error);
        return throwError(() => error); 
      })
    );

  }
  sellerLogin(data: Login) {
    return this.http.get<SignUp[]>(`${this.baseUrl+'seller'}?email=${data.email}&password=${data.password}`).pipe(
      tap(user => {
        if (user?.length>0) {
          this.loginStatus.emit(true);
          this.currentUser.set(user[0]);
          localStorage.setItem('user', JSON.stringify(user[0]))
          this.route.navigate(['seller-home']);
        }
        else{
           this.loginStatus.emit(false);
           this.loginError.emit("Invalid username or password.")
        }
        
      }),
      catchError(error => {
        console.error('Login error:', error);
        this.loginStatus.emit(false);
        this.loginError.emit('Something went wrong. Please try again.');
        return throwError(() => error); 
      })
    ).subscribe();
  }
}
