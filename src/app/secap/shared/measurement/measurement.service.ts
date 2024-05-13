import {DataService} from "../service/data.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MeasurementService {
    measurementBaseUrl: string = 'http://localhost:5173/buildings/measurement-types/';

    constructor(private dataService: DataService) {

    }

    getMeasurementTypeHeaders(): Observable<Map<string, string[]>> {
        return this.dataService.get<Map<string, string[]>>(this.measurementBaseUrl)
    }

    getMeasurementType(header: string): Observable<string[]> {
        return this.dataService.get<string[]>(this.measurementBaseUrl + header)
    }
}
