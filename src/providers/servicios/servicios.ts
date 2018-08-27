import {Injectable} from '@angular/core';
import {Http, Headers, Response, Request, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Conexion} from './../conexion/conexion';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeoutWith';
import {observable} from "rxjs/symbol/observable";


@Injectable()
export class Servicios {
  url: any;
  res: any;
  error: any;
  headers: any;
  options: any;
  token: any;
  time: number = 60000

  constructor(private http: Http) {

    this.url = Conexion.url;
    // this.token = localStorage.getItem('token');

    // this.headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + this.token,
    // });
    this.options = new RequestOptions({headers: this.headers});
  }

  post(enpoint,data){
     return this.http.post(this.url+enpoint , data,
    {
      method: "POST"
    })
    .timeoutWith(this.time, Observable.throw(error => {
      return error;
    }))
    .map(
      (res: Response) => {
        return res.json()
      }
      )
    .catch((error: Response) => {
      if (error.status == undefined) {
        error.status = 500;
      }
      return Observable.throw(error)
    });
  }
  get(enpoint){
     return this.http.get(this.url+enpoint , 
    {
      method: "GET"
    })
    .timeoutWith(this.time, Observable.throw(error => {
      return error;
    }))
    .map(
      (res: Response) => {
        return res.json()
      }
      )
    .catch((error: Response) => {
      if (error.status == undefined) {
        error.status = 500;
      }
      return Observable.throw(error)
    });
  }
  put(enpoint,data){
     return this.http.put(this.url+enpoint , data,
    {
      method: "PUT"
    })
    .timeoutWith(this.time, Observable.throw(error => {
      return error;
    }))
    .map(
      (res: Response) => {
        return res.json()
      }
      )
    .catch((error: Response) => {
      if (error.status == undefined) {
        error.status = 500;
      }
      return Observable.throw(error)
    });
  }
  delete(enpoint){
     return this.http.delete(this.url+enpoint,
    {
      method: "DELETE"
    })
    .timeoutWith(this.time, Observable.throw(error => {
      return error;
    }))
    .map(
      (res: Response) => {
        return res.json()
      }
      )
    .catch((error: Response) => {
      if (error.status == undefined) {
        error.status = 500;
      }
      return Observable.throw(error)
    });
  }
  // private cabeceras(){
  //   this.token = localStorage.getItem('token');

  //   this.headers = new Headers({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + this.token,
  //   });
  // }
}
