import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../_model/SignUp';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {

  sellerService = inject(SellerService)
  route = inject(Router)
  isSellerLogin = false;
  loginError = "";
  loginStatus = true;

  signUp(data: NgForm): void {
    this.sellerService.sellerSignUP(data.value).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => { console.log(err) }
    });
  }

  showSellerLogin() {
    if (!this.isSellerLogin) {
      this.isSellerLogin = true
    } else {
      this.isSellerLogin = false
    }
  }
  login(loginData: NgForm): void {
    this.loginError = "";
    this.loginStatus = false;
    this.sellerService.sellerLogin(loginData.value);
    this.sellerService.loginStatus.subscribe((res) => {
      if (!res) {
        this.sellerService.loginError.subscribe(message => {
          this.loginError = message;
          this.loginStatus = res;
        });
      }
    })
  }
}
