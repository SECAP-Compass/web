import {DataService} from "../service/data.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Measurement} from "../../energy/residential/common/measurement.model";

@Injectable({
    providedIn: 'root'
})
export class MeasurementService {
    measurementBaseUrl: string = 'buildings/measurement-types/';

    constructor(private dataService: DataService) {

    }

    getMeasurementTypeHeaders(): Observable<Map<string, string[]>> {
        return this.dataService.get<Map<string, string[]>>(this.measurementBaseUrl)
    }

    getMeasurementType(header: string): Observable<string[]> {
        return this.dataService.get<string[]>(this.measurementBaseUrl + header)
    }

    getMeasurementUnits() {
        return this.dataService.get<{
            measurementUnits: string[]
        }>('buildings/measurement-units')
    }
}
