import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleProductPagePageRoutingModule } from './single-product-page-routing.module';

import { SingleProductPagePage } from './single-product-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleProductPagePageRoutingModule
  ],
  declarations: [SingleProductPagePage]
})
export class SingleProductPagePageModule {}
