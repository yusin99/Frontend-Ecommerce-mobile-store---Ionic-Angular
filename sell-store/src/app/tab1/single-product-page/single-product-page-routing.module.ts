import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleProductPagePage } from './single-product-page.page';

const routes: Routes = [
  {
    path: '',
    component: SingleProductPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleProductPagePageRoutingModule {}
