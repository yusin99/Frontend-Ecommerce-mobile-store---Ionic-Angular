import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<any> {
  constructor(
    private productService: ProductService,
    private loadingController: LoadingController
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id;
    return this.productService.getSingleProduct(id).pipe(
      tap(async () => {
        if (await this.loadingController.getTop()) {
          this.loadingController.dismiss().then();
        }
      })
    );
    throw new Error('Method not implemented.');
  }
}
