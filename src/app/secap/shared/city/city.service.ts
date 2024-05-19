import {DataService} from "../service/data.service";
import {Injectable} from "@angular/core";
import {CityModel} from "./city.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CityService {

    cityBaseUrl: string = 'cities/';

    constructor(private dataService: DataService) {

    }

    getCityById(id: number): Observable<CityModel> {
        return this.dataService.get<CityModel>(this.cityBaseUrl + id);
    }
}
