import {Component} from '@angular/core';
import {IonicPage, NavController,Loading,AlertController,
	LoadingController, NavParams} from 'ionic-angular';
	import {Servicios} from "../../providers/servicios/servicios";

	@IonicPage()
	@Component({
		selector: 'page-subject',
		templateUrl: 'subject.html',
	})
	export class SubjectPage {
		subjects=[];
		subjects2=[];
		loading: Loading;
		respuesta:any;
		typeCourse=[];
		course:any;
		constructor(
			public navCtrl: NavController,
			public navParams: NavParams,
			public services: Servicios,
			private loadingCtrl: LoadingController,
			private alertCtrl: AlertController) {
			this.typeCourse =this.navParams.get("typeCourse");
			this.course =this.navParams.get("course");
		}
		ionViewWillEnter() {
			this.getsubjects();
		}
		ionViewDidEnter(){
			this.loading.dismissAll();
		}
		doRefresh(refresher){
			setTimeout(() => {
				this.getsubjects();
				refresher.complete();
			}, 1000);
		}
		getsubjects() {
			this.showLoading("Listando Subjects...");
			this.services.get("TypeCourse/"+this.typeCourse['id']+"/Course/"+this.course.id+"/Subject")
			.subscribe(res => {
				this.subjects = res;
				this.subjects2 = res;
				this.loading.dismiss();
			},
			err => {
				console.log("error", err);
				this.loading.dismiss();
				this.subjects=[];
				this.subjects2=[];
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
				this.subjects = this.subjects2.filter((item) => {
					console.log(item);
					return (item.NameSubject.toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			}
			else{
				this.subjects= this.subjects2;
			}
		}
		actionSubject(accion,subject){
			if(accion== 'agregar'){
				this.navCtrl.push("FormsubjectsPage",
				{
					course:this.course,
					typeCourse:this.typeCourse
				}
				);
			}
			else{	
				this.navCtrl.push("FormsubjectsPage",
				{
					course:this.course,
					typeCourse:this.typeCourse,
					subject: subject
				}
				);
			}
		}
		deleteSubject(subject){
			let prompt = this.alertCtrl.create({
				title: 'Eliminar Subject ',
				message: '<p align="justify">Esta seguro que desea eliminar el Subject '+subject.NameSubject+'?</p>',
				buttons: [
				{
					text: 'Si',
					handler: data => {
						this.showLoading("Eliminando el Subject...");
						this.services.delete("TypeCourse/"+this.typeCourse["id"]+"/Course/"+this.course.id+"/Subject/"+subject.id)
						.subscribe(
							rs => {this.respuesta = rs; console.log('respuesta',rs)},
							er => {
								this.loading.dismiss();
								console.log(this.respuesta);
								this.showMessage("Hubo un error al eliminar tu Subject, por favor intentalo mas tarde");
							},
							() => {
								this.loading.dismiss();
								this.showMessage("Tu Subject se elimino correctamente");
								this.getsubjects();
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