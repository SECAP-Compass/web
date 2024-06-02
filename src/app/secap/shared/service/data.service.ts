import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class DataService extends BaseHttpService {

    baseUrl = "http://localhost:8002/";

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    private token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzZWNhcCIsImV4cCI6MTcxNjA2NzI3OCwianRpIjoiMDJkYzFlNDItOTZhZi00MDE5LThlOTQtYWM5ZGM1NzQzYzgyIiwiaWF0IjoxNzE1OTgwODc4LCJpc3MiOiJzZWNhcC1hdXRoIiwic3ViIjoiZXZyZW5AbWFpbC5jb20iLCJjaXR5SWQiOjM0LCJjaXR5IjoiaXN0YW5idWwiLCJyb2xlcyI6WyJidWlsZGluZ0FkbWluIl0sImF1dGhvcml0eSI6ImlzdGFuYnVsIn0.W3zXJHY72AvJE0L-T4QpIEJAmY96-UiKkgQf0leey0g';

    post<T>(resource, path: string, params?: HttpParams): Observable<T> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', this.token);

        let url = this.baseUrl + path;

        return this.httpPost<T>(url, resource, headers, params).pipe(
            map((response) => JSON.parse(JSON.stringify(response.body)))
        );
    }

    update<T>(resource, path: string, params?: HttpParams): Observable<T> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', this.token);
        return this.httpPatch(this.baseUrl + path, resource, headers, params).pipe(
            map((response) => JSON.parse(JSON.stringify(response.body)))
        );
    }

    delete<T>(path: string) {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', this.token);
        return this.httpDelete(this.baseUrl + path, headers);
    }
    get<T>(path: string, params?: HttpParams): Observable<T> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', this.token);
        return this.httpGet<T>(this.baseUrl + path, headers, params).pipe(
            map((response) => JSON.parse(JSON.stringify(response.body)))
        );
    }
}
