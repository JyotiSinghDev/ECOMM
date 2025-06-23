import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 router = inject(Router)
 sellerService = inject(SellerService)
 areaName :string="default";
 sellerName:string|undefined ="";

 ngOnInit():void{
  this.sellerName = this.sellerService.currentUser()?.name;
  this.router.events.subscribe((val:any)=>{
    if(val.url){
    if(this.sellerService.currentUser()?.email && val.url.includes('seller')){
     this.areaName = "seller";
    }else{
     this.areaName = "default"
    }
  }
  
  })
 }

 logout(){
  this.sellerService.currentUser.set(null);
  localStorage.removeItem('user');
  this.router.navigate(['/']);
 }

}
