import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../_model/product';
import { environment } from './environment/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl

  addProduct(data:Product):Observable<Product>{
  return this.http.post<Product>(this.baseUrl+'products',data).pipe(
    catchError(err =>
    {
      console.log('Error while adding product',err);
      return throwError(()=>err)
    })
  )}

  productList():Observable<Product[]>{
  return this.http.get<Product[]>(this.baseUrl+'products').pipe(
    catchError(err=>{
     console.log('Error while fetching products',err);
      return throwError(()=>err)
    })
  )
  }

  deleteProduct(id:string):Observable<void>{
   return this.http.delete<void>(`${this.baseUrl}products/${id}`).pipe(
    catchError(err=>{
      console.log('Failed to delete product.')
     return throwError(()=>err)
    })
   );
  }
}
