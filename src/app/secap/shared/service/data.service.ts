import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class DataService extends BaseHttpService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    private token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzZWNhcCIsImV4cCI6MTcxNTcwOTU5MCwianRpIjoiMzk3NmMxNDQtNzA4Zi00OTM4LTkyMDgtZDQ4MGU4ZjRjZjdmIiwiaWF0IjoxNzE1NjIzMTkwLCJpc3MiOiJzZWNhcC1hdXRoIiwic3ViIjoiZTF2cmVuMTMxMkBtYWlsLmNvbSIsImNpdHlJZCI6MzQsImNpdHkiOiJpc3RhbmJ1bCIsInJvbGVzIjpbImJ1aWxkaW5nQWRtaW4iXSwiYXV0aG9yaXR5IjoiaXN0YW5idWwifQ.W9csLYvjeJx0lRe2mJVKsKQq-1Jwjxgchkz-Ru8iSJ8';

    post<T>(resource, url: string, params?: HttpParams): Observable<T> {
        let headers = new HttpHeaders();
        headers = headers.append(
            'Authorization',
            this.token,
        );
        return this.httpPost<T>(url, resource, headers, params).pipe(
            map(response => JSON.parse(JSON.stringify(response.body)))
        );
    }

    update<T>(resource, url: string, params?: HttpParams): Observable<T>{
        let headers = new HttpHeaders();
        headers = headers.append(
            'Authorization',
            this.token,
        );
        return this.httpPatch(url, resource, headers, params).pipe(
            map(response => JSON.parse(JSON.stringify(response.body)))
        );
    }

    delete<T>(url: string) {
        let headers = new HttpHeaders();
        headers = headers.append(
            'Authorization',
            this.token,
        );
        return this.httpDelete(url, headers);
    }
    get<T>(url: string, params?: HttpParams): Observable<T> {
        let headers = new HttpHeaders();
        headers = headers.append(
            'Authorization',
            this.token,
        );
        return this.httpGet<T>(url, headers, params).pipe(
            map(response => JSON.parse(JSON.stringify(response.body)))
        );
    }
}
