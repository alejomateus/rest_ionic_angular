import {Component, ViewChild} from '@angular/core';
import {Platform, AlertController, Nav, MenuController, ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Network} from '@ionic-native/network';
import {Servicios} from '../providers/servicios/servicios';
declare var google;

declare var username: string;

@Component({
  templateUrl: 'app.html',
  //providers:[AuthServiceProvider]
})

export class MyApp {
  @ViewChild('NAV') nav: Nav;
  public rootPage: any;
  public pages: Array<{ titulo: string, component: any, icon: string }>;
  toast: any;
  closealert: any;
  closevar = false;
  nombre_usuario = "";
  showSubmenu: boolean = false;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private network: Network,
    private alertCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public servicios: Servicios,
) {
    platform.ready().then(() => {
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.presentToast("No hay conexion a internet", 5000);
      });

      let connectSubscription = this.network.onConnect().subscribe(data => {
        this.toast.dismiss();
        this.presentToast("Estas de nuevo en linea ", 1000);

      });

      platform.registerBackButtonAction(() => {
        if (this.nav.canGoBack()) {
          this.nav.pop();
        } else {
          if(!this.closevar) {
            this.closevar=true;
            this.closealert = this.alertCtrl.create({
              title: 'Salir',
              subTitle: "Realmente desea salir de la aplicación.",
              buttons: [
              {
                text: 'Volver',
                handler: data => {
                  this.closevar = false;
                },
                cssClass: 'colorbuttonalerta'
              },
              {
                text: 'Salir',
                handler: data => {
                  platform.exitApp()

                },
                cssClass: 'colorbuttonalerta'
              }
              ],
              enableBackdropDismiss: false,
            });
            this.closealert.present();
          }


        }
      });
      let yo = this;
        this.rootPage = 'LoginPage';
      setTimeout(function () {
        splashScreen.hide();

      }, 1000);
    });
  }

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
    console.log(this.showSubmenu);
  }

  presentToast(text, duration) {
    this.toast = this.toastCtrl.create({
      message: text,
      duration: duration,
      position: 'bottom',
      cssClass: 'networkDisconnect'
    });
    this.toast.present();
  }
}

