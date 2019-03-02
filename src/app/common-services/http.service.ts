import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
const API_BASE_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  noAuthHeader = { headers: new HttpHeaders({
     'NoAuth': 'True',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
     'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
     'Access-Control-Allow-Credentials': 'true'
    })};

  constructor(private http: HttpClient) { }

  get(url): Observable<any> {
    return this.http.get(API_BASE_URL + url);
  }

  post(url, body: any): Observable<any> {
    return this.http.post(API_BASE_URL + url, body, this.noAuthHeader);
  }

  put(url, body: any): Observable<any> {
    return this.http.put(API_BASE_URL + url, body, this.noAuthHeader);
  }

  delete(url): Observable<any> {
    return this.http.delete(API_BASE_URL + url, this.noAuthHeader);
  }
}
