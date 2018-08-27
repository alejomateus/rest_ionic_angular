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


@IonicPage()
@Component({
	selector: 'page-formsubjects',
	templateUrl: 'formsubjects.html',
})
export class FormsubjectsPage {
	NameSubject: AbstractControl;
	Duration: AbstractControl;
	Description: AbstractControl;
	creditos: AbstractControl;
	myForm: FormGroup;
	course:any;
	option="agregar";
	loading: Loading;
	typeCourse:any;
	subject:any;
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
		this.course = this.navParams.get("course");
		if(this.navParams.get("subject") != undefined){
			this.option="editar";
			this.subject =this.navParams.get("subject");
			this.myForm = fb.group({
				NameSubject: [this.subject.NameSubject, [Validators.required]],
				Duration: [this.subject.Duration, [Validators.required]],
				Description: [this.subject.Description, [Validators.required]],
				creditos: [this.subject.creditos, [Validators.required]],
			});
		}
		else{
			this.myForm = fb.group({
				NameSubject: ['', [Validators.required]],
				Duration: ['', [Validators.required]],
				Description: ['', [Validators.required]],
				creditos: ['', [Validators.required]],
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

	guardarsubject(form){
		let datos={
			"NameSubject": form.value["NameSubject"],
			"Duration": form.value["Duration"],
			"Description": form.value["Description"],
			"creditos": form.value["creditos"],
		}
		this.showLoading("Guardando Subject...");
		if (this.option =="agregar"){
			datos["TypeCourseId"]=this.typeCourse.id,
			this.services.post("TypeCourse/"+this.typeCourse["id"]+"/Course/"+this.course.id+"/Subject",datos).subscribe(
				rs => {this.respuesta = rs; console.log('respuesta',rs)},
				er => {
					this.loading.dismiss();
					this.showMessage("Hubo un error al crear tu Subject, por favor intentalo mas tarde");
				},
				() => {
					this.loading.dismiss();
					this.showMessage("Tu Subject se agrego correctamente");
					this.navCtrl.pop();
				}
				);
		}
		else{
			this.services.put("TypeCourse/"+this.typeCourse["id"]+"/Course/"+this.course.id+"/Subject/"+this.subject.id,datos).subscribe(
				rs => {this.respuesta = rs; console.log('respuesta',rs)},
				er => {
					this.loading.dismiss();
					this.showMessage("Hubo un error al crear tu Subject, por favor intentalo mas tarde");
				},
				() => {
					this.loading.dismiss();
					this.showMessage("Tu Subject se edito correctamente");
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
