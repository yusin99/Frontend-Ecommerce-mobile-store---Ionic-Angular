/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../services/product.service';
import { ProductModel } from './../Models/product-model';
import {
  LoadingController,
  MenuController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SortModalComponent } from './../Components/sort-modal/sort-modal.component';
import { CategoryModel } from './../Models/category-model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  sliderImages: any[] = [
    '/assets/slide1.jpg',
    '/assets/slide2.jpg',
    '/assets/slide3.jpg',
    '/assets/slide4.jpg',
    '/assets/slide5.jpg',
  ];
  sliderOptions = {
    autoplay: {
      delay: 2000,
    },
    loop: true,
  };
  listArrayOfProducts: ProductModel[] = [];
  displayedList: ProductModel[] = [];
  currentPage: number = 1;
  currentPlatform: boolean;
  role_sort: any;
  data_sort: any;
  name_filter: any;
  selected_filter: any;
  filterCount = 0;
  filteredCategoryList: any[] = [];
  categories: CategoryModel[] = [];
  constructor(
    private productService: ProductService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform,
    private modalController: ModalController,
    private menuController: MenuController
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.currentPlatform = true;
        console.log('android');
      } else if (this.platform.is('ios')) {
        this.currentPlatform = false;
        console.log('ios');
      } else {
        //fallback to browser APIs or
        console.log('The platform is not supported');
      }
    });
  }
  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Getting Products..',
      spinner: 'bubbles',
      animated: true,
    });
    await loader.present().then();
    this.productService.getAllProducts().subscribe(
      async (products: ProductModel[]) => {
        await loader.dismiss().then();
        this.listArrayOfProducts = products;
        this.displayedList = [...this.listArrayOfProducts];
      },
      async (err) => {
        await loader.dismiss().then();
        console.log(err);
      }
    );
    this.categories = await this.productService.getAllCategories().toPromise();
  }
  openFilterModal() {
    this.menuController.enable(true, 'filter').then();
    this.menuController.open('filter').then();
  }
  openModal() {
    this.modalController
      .create({
        component: SortModalComponent,
        animated: true,
        cssClass: 'sortModal',
      })
      .then((el) => {
        el.present();
        return el.onDidDismiss().then((resultData) => {
          this.role_sort = resultData.role;
          this.data_sort = resultData.data;
          this.sortProducts({ role: resultData.role, data: resultData.data });
        });
      });
  }
  sortProducts(resultData: { role: string; data: any }) {
    const { role, data } = { ...resultData };
    if (role === 'cancel') {
      return;
    } else if (role === 'sort') {
      // check the type of data
      if (data === 'title-asc') {
        this.displayedList.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
      } else if (data === 'title-desc') {
        this.displayedList.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
          return 0;
        });
      } else if (data === 'price-asc') {
        this.displayedList.sort((a, b) => {
          // @ts-ignore
          return a.price - b.price;
        });
      } else if (data === 'price-desc') {
        this.displayedList.sort((a, b) => {
          // @ts-ignore
          return b.price - a.price;
        });
      }
    }
  }
  loadingSpinner() {
    this.loadingController
      .create({
        message: 'Loading details',
        animated: true,
        spinner: 'crescent',
        backdropDismiss: false,
        showBackdrop: true,
      })
      .then((el) => el.present());
  }
  async loadMoreData(e: any) {
    const toast = await this.toastController.create({
      message: 'No more products',
      animated: true,
      duration: 2000,
      buttons: [
        {
          text: 'Done',
          role: 'Cancel',
          icon: 'close',
        },
      ],
    });
    if (e === null) {
      this.currentPage = 1;
    } else {
      this.currentPage++;
      this.productService.getAllProducts(this.currentPage).subscribe(
        async (prods: ProductModel[]) => {
          this.listArrayOfProducts = this.listArrayOfProducts.concat(prods);
          this.displayedList = [...this.listArrayOfProducts];
          this.sortProducts({ role: this.role_sort, data: this.data_sort });
          // this.categoryFilter({
          //   name: this.name_filter,
          //   selected: this.selected_filter,
          // });
          if (e !== null) {
            e.target.complete();
          }
          if (prods.length < 10) {
            await toast.present().then();
            // e.target.disabled() = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  categoryFilter(ev: { name: string; selected: boolean }) {
    // If the user clicked the filter for the first time and nothing is selected
    this.name_filter = ev.name;
    this.selected_filter = ev.selected;
    if (ev.selected && this.filterCount === 0) {
      this.filteredCategoryList.push(ev.name);
      this.filterCount++;
      this.displayedList = this.displayedList.filter((p) =>
        p.categories.some((cat) => cat.name === ev.name)
      );
    }
    // If the category selected is not present in the list of items
    else if (ev.selected && this.filterCount >= 1) {
      const newArray = [...this.listArrayOfProducts];
      this.filterCount++;

      if (!this.filteredCategoryList.includes(ev.name)) {
        this.filteredCategoryList.push(ev.name);

        const product: ProductModel[] = newArray.filter((p) =>
          p.categories.some((cat) => cat.name === ev.name)
        );
        let i;

        product.forEach((p) => {
          i = this.displayedList.findIndex((prod) => prod.id === p.id);

          // If product is present in the array
          if (i !== -1) {
            return;
          } else {
            this.displayedList = this.displayedList.concat(p);
          }
        });
      } else {
        return;
      }
    } // END OF ELSE IF
    else if (!ev.selected && this.filterCount >= 1) {
      const newArray = [...this.listArrayOfProducts];
      this.filterCount--;

      // Remove the category from the filter list array
      this.filteredCategoryList = this.filteredCategoryList.filter(
        (el) => el !== ev.name
      );

      if (this.filteredCategoryList.length > 0) {
        this.displayedList = [];
        this.filteredCategoryList.forEach((el) => {
          this.displayedList = this.displayedList.concat(
            newArray.filter((p) => p.categories.some((cat) => cat.name === el))
          );
        });
      }

      // Check if the filter count has reached 0, that means no filter is present now
      if (this.filterCount === 0) {
        this.displayedList = [...this.listArrayOfProducts];
      }
    }
  }
}
