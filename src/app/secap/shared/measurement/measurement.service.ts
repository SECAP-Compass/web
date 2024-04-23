import {DataService} from "../service/data.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MeasurementService {
    measurementBaseUrl: string = 'http://localhost:8080/measurements/';

    constructor(private dataService: DataService) {

    }

    getMeasurementTypes(): Observable<string[]> {
        return this.dataService.get<string[]>(this.measurementBaseUrl + 'types')
    }

}
