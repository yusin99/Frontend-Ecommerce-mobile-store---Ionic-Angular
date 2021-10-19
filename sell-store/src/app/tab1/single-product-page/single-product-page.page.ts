/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductModel } from './../../Models/product-model';
import { ProductService } from './../../services/product.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.page.html',
  styleUrls: ['./single-product-page.page.scss'],
})
export class SingleProductPagePage implements OnInit {
  product: ProductModel[] = [];
  showData: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.product = data.product;
      console.log(data);
      this.showData = true;
    });
    // this.route.paramMap
    //   .pipe(
    //     map((param: any) => {
    //       return param.params.id;
    //     })
    //   )
    //   .subscribe((prodId) => {
    //     this.productService.getSingleProduct(prodId).subscribe((prod) => {
    //       this.product = prod;
    //     });
    //   });
  }
}
