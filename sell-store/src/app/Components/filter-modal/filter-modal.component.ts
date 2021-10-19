/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-output-rename */
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { IonCheckbox, MenuController } from '@ionic/angular';
import { CategoryModel } from './../../Models/category-model';
import { Router } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {
  @Output('checkbox') checkbox: EventEmitter<any> = new EventEmitter<any>();
  @Input('categories') categories: CategoryModel[] = [];
  collapsed: boolean;
  @ViewChild('checkbox', { static: false }) ionCheckbox: IonCheckbox;
  constructor(private menuController: MenuController, private router: Router) {}

  ngOnInit() {
    this.collapsed = true;
  }
  onClick() {
    this.collapsed = !this.collapsed;
  }
  closeMenu() {
    this.menuController.close('filter').then();
  }
  checkboxSelected(e: any) {
    this.menuController.close('fliter').then();
    this.checkbox.emit({
      name: e.target.name,
      selected: e.target.checked,
    });
  }
}
