import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private router: Router) {}
  navigateToAcc() {
    this.router.navigate(['/tabs/tab2']).then();
  }
  logout() {
    console.log('logged out');
  }
}
