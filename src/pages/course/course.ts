import {Component} from '@angular/core';
import {IonicPage, NavController,Loading,AlertController,
	LoadingController, NavParams} from 'ionic-angular';
	import {Servicios} from "../../providers/servicios/servicios";

	@IonicPage()
	@Component({
		selector: 'page-course',
		templateUrl: 'course.html',
	})
	export class CoursePage {
		courses=[];
		courses2=[];
		loading: Loading;
		respuesta:any;
		typeCourse=[];
		constructor(
			public navCtrl: NavController,
			public navParams: NavParams,
			public services: Servicios,
			private loadingCtrl: LoadingController,
			private alertCtrl: AlertController) {
			this.typeCourse =this.navParams.get("typecourse");
		}
		ionViewWillEnter() {
			this.getCourses();
		}
		ionViewDidEnter(){
			this.loading.dismissAll();
		}
		doRefresh(refresher){
			setTimeout(() => {
				this.getCourses();
				refresher.complete();
			}, 1000);
		}
		getCourses() {
			this.showLoading("Listando Courses...");
			this.services.get("TypeCourse/"+this.typeCourse['id']+"/Course")
			.subscribe(res => {
				this.courses = res;
				this.courses2 = res;
				this.loading.dismiss();
			},
			err => {
				console.log("error", err);
				this.loading.dismiss();
				this.courses=[];
				this.courses2=[];
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
				this.courses = this.courses2.filter((item) => {
					console.log(item);
					return (item.NameCourse.toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			}
			else{
				this.courses= this.courses2;
			}
		}
		actioncourse(accion,course){
			if(accion== 'agregar'){
				this.navCtrl.push("FormcoursesPage",{typeCourse:this.typeCourse});
			}
			else{	
				this.navCtrl.push("FormcoursesPage",
				{
					course:course,
					typeCourse:this.typeCourse
				}
				);
			}
		}
		deleteCourse(course){
			console.log(course);
			let prompt = this.alertCtrl.create({
				title: 'Eliminar course ',
				message: '<p align="justify">Esta seguro que desea eliminar el course '+course.NameCourse+'?</p>',
				buttons: [
				{
					text: 'Si',
					handler: data => {
						this.showLoading("Eliminando el course...");
						this.services.delete("TypeCourse/"+this.typeCourse["id"]+"/Course/"+course.id)
						.subscribe(
							rs => {this.respuesta = rs; console.log('respuesta',rs)},
							er => {
								this.loading.dismiss();
								console.log(this.respuesta);
								this.showMessage("Hubo un error al eliminar tu course, por favor intentalo mas tarde");
							},
							() => {
								this.loading.dismiss();
								this.showMessage("Tu course se elimino correctamente");
								this.getCourses();
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
		goToSubject(course){
			this.navCtrl.push("SubjectPage",
			{
				typeCourse:this.typeCourse,
				course:course
			}
			);
		}
	}
