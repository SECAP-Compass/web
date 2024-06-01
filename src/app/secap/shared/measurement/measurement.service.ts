import {DataService} from "../service/data.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpParams} from '@angular/common/http';

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

    getMeasurementsByFilter(filter: any): Observable<any> {
        let params = new HttpParams()
          .set('startDate', filter.startDate)
          .set('endDate', filter.endDate)
          .set('page', filter.page || '0')
          .set('size', filter.size || '10');
    
        filter.types.forEach((type: string, index: number) => {
          params = params.append(`types[${index}]`, type);
        });
    
        filter.typeHeaders.forEach((header: string, index: number) => {
          params = params.append(`typeHeaders[${index}]`, header);
        });
    
        filter.gasTypes.forEach((gas: string, index: number) => {
          params = params.append(`gasTypes[${index}]`, gas);
        });
    
        const path = `/filter/${filter.buildingId}`;
        
        return this.dataService.get<any>(path, params);
      }
}
