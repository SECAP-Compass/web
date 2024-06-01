import {DataService} from "../service/data.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpParams} from '@angular/common/http';
import { BuildingMeasurement } from "./measurement-model";
import {Page} from "../model/page.model";

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

    getMeasurementTypeHeadersHardcoded():string[]{
        return ["Total","Electricity","District Heating/Cooling","Fossil Fuels","Renewable Energies"]
    }

    getGassesHardcoded():string[]{
        return ["All","CO2","CH4","N2O", "CO2e","Biofuel CO2"]
    }

    getMeasurementType(header: string): Observable<string[]> {
        return this.dataService.get<string[]>(this.measurementBaseUrl + header)
    }

    getMeasurementUnits() {
        return this.dataService.get<{
            measurementUnits: string[]
        }>('buildings/measurement-units')
    }

    getMeasurementsByFilter(filter: any): Observable<Page<BuildingMeasurement>> {
        let params = new HttpParams()
          .set('buildingId',filter.buildingId)
          .set('startDateMonth', filter.startDate.month)
          .set('startDateYear',filter.startDate.year)
          .set('endDateMonth', filter.endDate.month)
          .set('endDateYear',filter.endDate.year);
    
        /*
        filter.types.forEach((type: string, index: number) => {
          params = params.append(`types[${index}]`, type);
        });
    */
        
        if(filter.typeHeaders[0]!='Total'){
            filter.typeHeaders.forEach((header: string, index: number) => {
                params = params.append(`typeHeaders[${index}]`, header);
              });
        }
        if(filter.gasTypes[0]!='All'){
            filter.gasTypes.forEach((gas: string, index: number) => {
                params = params.append(`gasTypes[${index}]`, gas);
              });
        }

        const path = "measurements/filter"
        return this.dataService.get<Page<BuildingMeasurement>>(path, params);
      }
}
