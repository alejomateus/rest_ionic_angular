import {Component} from '@angular/core';
import {IonicPage, NavController,Loading,AlertController,
	LoadingController, NavParams} from 'ionic-angular';
	import {Servicios} from "../../providers/servicios/servicios";

	@IonicPage()
	@Component({
		selector: 'page-principal',
		templateUrl: 'principal.html',
	})
	export class PrincipalPage {
		typecourses=[];
		typecourses2=[];
		loading: Loading;
		respuesta:any;
		constructor(
			public navCtrl: NavController,
			public navParams: NavParams,
			public services: Servicios,
			private loadingCtrl: LoadingController,
			private alertCtrl: AlertController) {
		}
		ionViewWillEnter() {
			this.getTypeCourses();
		}
		ionViewDidEnter(){
			this.loading.dismissAll();
		}
		doRefresh(refresher){
			setTimeout(() => {
				this.getTypeCourses();
				refresher.complete();
			}, 1000);
		}
		getTypeCourses() {
			this.showLoading("Listando TypeCourses");
			this.services.get("TypeCourse")
			.subscribe(res => {
				this.typecourses = res;
				this.typecourses2 = res;
				this.loading.dismiss();
			},
			err => {
				console.log("error", err);
				this.loading.dismiss();
				this.typecourses=[];
				this.typecourses2=[];
			})
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
					text: 'OK',
					handler:data =>{
					}
				}]
			});
			alert.present();
		}
		getItems(ev) {
			console.log("ev",ev);
			var val = ev.target.value;
			if (val && val.trim() != '') {
				this.typecourses = this.typecourses2.filter((item) => {
					return (item.NameTypeCourse.toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			}
			else{
				this.typecourses= this.typecourses2;
			}
		}
		goToCourses(typecourse){
			this.navCtrl.push("CoursePage",
			{
				typecourse:typecourse
			});
		}
		Typecourse(accion,typecourse){
			let yo = this;
			let value="";
			if (accion =="editar"){
				value=typecourse.NameTypeCourse;
			}
			let prompt = this.alertCtrl.create({
				message: "Escribe a continuación el nombre del TypeCourse",
				inputs: [
				{
					name: 'name_type_course',
					placeholder: 'Nombre',
					type: 'text',
					id: "name_type_course",
					value:value
				}
				],
				buttons: [
				{
					text: 'Aceptar',
					handler: data => {
						let datos = {
							"NameTypeCourse": data.name_type_course
						}
						this.showLoading("Guardando TypeCourse...");
						if (accion =="agregar"){
							yo.services.post("TypeCourse",datos).subscribe(
								rs => {yo.respuesta = rs; console.log('respuesta',rs)},
								er => {
									yo.loading.dismiss();
									yo.showMessage("Hubo un error al crear tu TypeCourse, por favor intentalo mas tarde");
								},
								() => {
									yo.loading.dismiss();
									yo.showMessage("Tu npm rebuild node-sass se agrego correctamente");
									yo.getTypeCourses();
								}
								);
							
						}
						else if (accion =="editar"){
							yo.services.put("TypeCourse/"+typecourse.id,datos).subscribe(
								rs => {yo.respuesta = rs; console.log('respuesta',rs)},
								er => {
									yo.loading.dismiss();
									yo.showMessage("Hubo un error al editar tu TypeCourse, por favor intentalo mas tarde");
								},
								() => {
									yo.loading.dismiss();
									yo.showMessage("Tu TypeCourse se edito correctamente");
									yo.getTypeCourses();
								}
								);
						}
					},
				},
				{
					text: 'Cancelar',
					handler: data => {
					},
				}],
			});
			prompt.present();
		}
		deleteTypeCourse(typecourse){
			let prompt = this.alertCtrl.create({
				title: 'Eliminar Typecourse ',
				message: '<p align="justify">Esta seguro que desea eliminar el TypeCourse '+typecourse.NameTypeCourse+'?</p>',
				buttons: [
				{
					text: 'Si',
					handler: data => {
						this.showLoading("Eliminando la Typecourse...");
						this.services.delete("TypeCourse/"+typecourse.id)
						.subscribe(
							rs => {this.respuesta = rs; console.log('respuesta',rs)},
							er => {
								this.loading.dismiss();
								console.log(this.respuesta);
								this.showMessage("Hubo un error al eliminar tu Typecourse, por favor intentalo mas tarde");
							},
							() => {
								this.loading.dismiss();
								this.showMessage("Tu Typecourse se elimino correctamente");
								this.getTypeCourses();
							}
							);
					}
					,
					cssClass: 'buttonrecuperar'
				},
				{
					text: 'Cancelar',
					handler: data => {
					},
					cssClass: 'buttonrecuperar2'
				}
				],
				cssClass: 'modalrecuperar'
			});
			prompt.present();
		}
	}
