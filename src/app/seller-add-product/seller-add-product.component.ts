import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  productService = inject(ProductService);

  product = {
    id:'',
    productName: '',
    productPrice: 0,
    productColor: '',
    productCategory: '',
    productDescription: '',
    productImageUrl: ''
  }

  addNewProduct(form: NgForm) {
    this.productService.addProduct(this.product).subscribe({
      next: (res) => {
        alert("Product added successfully.");
        this.resetForm(form);
      },
      error: (err) => {
        console.error("Error adding product:", err);
        alert("Failed to add product. Please try again.");
      }
    });
  }

  resetForm(form: NgForm) {
    form.reset();
  }

}
