import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ProductModel } from './../Models/product-model';
import { Observable } from 'rxjs';
import { CategoryModel } from '../Models/category-model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.backend_api_url;
  constructor(private http: HttpClient) {}

  getAllProducts(pageNumber: number = 1): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      // eslint-disable-next-line max-len
      `${this.url}/products?page=${pageNumber}&per_page=10`
    );
  }
  getSingleProduct(id: number): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.url}/products/${id}`);
  }
  searchProducts(keyword: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      `${this.url}/products/?search=${keyword}`
    );
  }
  getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(
      `${this.url}/products/categories?per_page=100&hide_empty=true&parent=0`
    );
  }
}
