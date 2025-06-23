import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../_model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {

 private productervice = inject(ProductService);
productList : Product[] =[];

ngOnInit():void{
  this.loadProduct();
}

loadProduct():void{
  this.productervice.productList().subscribe({
  next:(res:Product[])=>{
    this.productList=res;
  },
  error:(err)=>{
  console.log("Error while fething the products")
  }
})
}

deleteProduct(id:string){
this.productervice.deleteProduct(id).subscribe(
  {
    next : (res :void)=>{
      alert("Produc deleted successfully.")
      this.loadProduct();
    },
    error :(err)=>{
     console.log("Failed to delete product.")
    }
  }
)
}

}
