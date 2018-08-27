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
	ViewController,
	ActionSheetController,
	MenuController
} from 'ionic-angular';
import {Servicios} from "../../providers/servicios/servicios";
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import * as $ from 'jquery';


declare var cordova: any;

@IonicPage()
@Component({
	selector: 'page-formcourses',
	templateUrl: 'formcourses.html',
})
export class FormcoursesPage {
	NameCourse: AbstractControl;
	DurationTotal: AbstractControl;
	Description: AbstractControl;
	NoRegisterMinE: AbstractControl;
	NoRegisterMIL: AbstractControl;
	isMilitar: AbstractControl;
	myForm: FormGroup;
	course:any;
	option="agregar";
	loading: Loading;
	typeCourse:any;
	respuesta:any;
	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public services: Servicios,
		private alertCtrl: AlertController,
		private fb: FormBuilder,
		public toastCtrl: ToastController,
		public platform: Platform,
		public loadingCtrl: LoadingController) {
		this.typeCourse = this.navParams.get("typeCourse");
		if(this.navParams.get("course") != undefined){
			this.option="editar";
			let militar=0;
			this.course =this.navParams.get("course");
			if (this.course.IsMilitar){
				militar=1;
			}
			this.myForm = fb.group({
				NameCourse: [this.course.NameCourse, [Validators.required]],
				DurationTotal: [this.course.DurationTotal, [Validators.required]],
				Description: [this.course.Description, [Validators.required]],
				NoRegisterMinE: [this.course.NoRegisterMinE, [Validators.required]],
				NoRegisterMIL: [this.course.NoRegisterMIL, [Validators.required]],
				isMilitar:[militar]
			});
			console.log(militar);
			this.myForm.controls['isMilitar'].setValue(militar);
		}
		else{
			this.myForm = fb.group({
				NameCourse: ['', [Validators.required]],
				DurationTotal: ['', [Validators.required]],
				Description: ['', [Validators.required]],
				NoRegisterMinE: ['', [Validators.required]],
				NoRegisterMIL: ['', [Validators.required]],
				isMilitar:[0]
			});
		}

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

	guardarcourse(form){
		console.log(form.value["isMilitar"]);
		let  militar = false;
		if (form.value["isMilitar"] ==1){
			militar =true;
		}
		let datos={
			"NameCourse": form.value["NameCourse"],
			"IsMilitar": form.value["isMilitar"],
			"DurationTotal": form.value["DurationTotal"],
			"Description": form.value["Description"],
			"NoRegisterMinE": form.value["NoRegisterMinE"],
			"NoRegisterMIL": form.value["NoRegisterMIL"]
		}
		this.showLoading("Guardando Course...");
		if (this.option =="agregar"){
			datos["TypeCourseId"]=this.typeCourse.id,
			this.services.post("TypeCourse/"+this.typeCourse["id"]+"/Course",datos).subscribe(
				rs => {this.respuesta = rs; console.log('respuesta',rs)},
				er => {
					this.loading.dismiss();
					this.showMessage("Hubo un error al crear tu course, por favor intentalo mas tarde");
				},
				() => {
					this.loading.dismiss();
					this.showMessage("Tu course se agrego correctamente");
					this.navCtrl.pop();
				}
				);
		}
		else{
			this.services.put("TypeCourse/"+this.typeCourse["id"]+"/Course/"+this.course.id,datos).subscribe(
				rs => {this.respuesta = rs; console.log('respuesta',rs)},
				er => {
					this.loading.dismiss();
					this.showMessage("Hubo un error al crear tu course, por favor intentalo mas tarde");
				},
				() => {
					this.loading.dismiss();
					this.showMessage("Tu course se edito correctamente");
					this.navCtrl.pop();
				}
				);
		}

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
