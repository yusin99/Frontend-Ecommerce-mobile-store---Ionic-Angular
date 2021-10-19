/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
//import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';
const { Storage, StatusBar } = Plugins;

// import { CarritoService } from './services/carrito.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide().then();
      }
    });
  }
}
