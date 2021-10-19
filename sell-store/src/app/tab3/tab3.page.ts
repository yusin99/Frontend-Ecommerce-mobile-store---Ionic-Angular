import { Component, OnInit } from '@angular/core';
// import {CartService} from "../services/cart.service";
// import {CartModel} from "../models/cartModel";
import { CartModel } from './../Models/cart-model';
import { CartService } from './../services/cart.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  cart: CartModel;
  total: number;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartData.subscribe((data) => {
      this.cart = data;
    });

    this.cartService.cartTotal.subscribe((total) => {
      console.log(total + ' sad ');
      this.total = total;
    });
  }
}
