import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  AlertController,
  LoadingController,
  Platform,
  ToastController ,
  MenuController
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import { emailValidator } from '../../app/validators/validators';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  loading: Loading;
  islogged: any;
  respuesta: any;
  nombre_usuario: AbstractControl;
  password: AbstractControl;
  myForm: FormGroup;
  modalrecuperar:any;

  constructor(public nav: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private platform: Platform,
    public menu: MenuController) {
    this.menu.swipeEnable(false);
    this.myForm = fb.group({
      nombreUsuario: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
    });


  }


public login(req) {
  this.showLoading("Verificando tus credenciales...");
  console.log(req.value);
  this.loading.dismiss();
  this.nav.setRoot('PrincipalPage');

}


showLoading(text) {
  this.loading = this.loadingCtrl.create({
    content: text,
    dismissOnPageChange: true
  });
  this.loading.present();
}

showMessage(text) {
  let alert = this.alertCtrl.create({
    subTitle: text,
    buttons: [{
      text: 'Aceptar',
      role: 'ok'
    }]
  });
  alert.present();
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

}
