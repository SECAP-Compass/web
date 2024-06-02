import {DataService} from "../service/data.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpParams} from '@angular/common/http';
import { BuildingMeasurement, ReportModel } from "./measurement-model";
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
        return ["Total","Electricity","District heating and cooling","Fossil fuels","Renewable energies"]
    }

    getGassesHardcoded():string[]{
        return ["All","CO2","CH4","N2O", "CO2e","Biofuel CO2"]
    }

    getGasNames():string[]{
        return ["CO2","CH4","N2O", "CO2e","Biofuel CO2","EF"]
    }

    getEmissionTypeKeysHardcoded():string[]{
        return ["Electricity","DistrictHeatingAndCooling","FossilFuels","RenewableEnergies"]
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
          .set('endDateYear',filter.endDate.year)
          .set('size',50);

        if(filter.typeHeaders[0]=='Fossil fuels'){
            params = params.append(`typeHeaders`, 'FossilFuels');
        }
        else if(filter.typeHeaders[0]=='Renewable energies'){
            params = params.append(`typeHeaders`, 'RenewableEnergies');
        }
        else if(filter.typeHeaders[0]=='District Heating and cooling'){
            params = params.append(`typeHeaders`, 'DistrictHeatingAndCooling');
        }
        else if(filter.typeHeaders[0]=='Electricity'){
            params = params.append(`typeHeaders`, 'Electricity');
        }
        else if(filter.typeHeaders[0]!='Total'){
            params = params.append(`typeHeaders`, filter.typeHeaders[0]);
        }
        const path = "measurements/filter"
        return this.dataService.get<Page<BuildingMeasurement>>(path, params);
      }

      getCityMeasurementsByFilter(filter:any):Observable<ReportModel>{

        const cityId: string = `${filter.cityId}_${filter.year}`;

        let params = new HttpParams()
        .set('cityId',cityId);

        const path = "measurements/filter/city";
        return this.dataService.get<ReportModel>(path, params);
      }
}
