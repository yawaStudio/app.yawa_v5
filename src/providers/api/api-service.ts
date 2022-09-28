import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  // Dev endpoints
  selling: string = "https://localhost/selling.yawa-trans.com/";
  server: string = "https://127.0.0.1:3333/api/v1/";
  
  
  // Prod endpoints
  //selling: string = "https://selling.yawa-trans.com/api/";
  //server: string = "https://api.yawa-trans.com/api/v1/";

  constructor(public http: HttpClient) { }

  postData(body, file) {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=utf-8',
       });
    let options = {
      headers: headers
    }

    return this.http.post(this.server + file, JSON.stringify(body), options)
      .pipe(map(res => res));
  }

  
  seller(body, file) {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=utf-8',
       });
    let options = {
      headers: headers
    }

    return this.http.post(this.selling + file+'.php', JSON.stringify(body), options)
      .pipe(map(res => res));
  }
}
