import {Injectable, numberAttribute, OnInit} from '@angular/core';
import { DataService } from '../../../../shared/service/data.service';
import { Building } from '../building.model';
import { Consumption } from '../consumption.model';
import { Measurement } from '../measurement.model';
import {MeasurementService} from "../../../../shared/measurement/measurement.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Page} from "../../../../shared/model/page.model";
import {CreateResidentialRequest} from "./residential.request.model";
import {HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class ResidentialService {

    private consumptionsSubject: BehaviorSubject<Record<number, Consumption>> = new BehaviorSubject({});
    private measurementsSubject: BehaviorSubject<Record<number, Measurement[]>> = new BehaviorSubject({});

    consumptions : Record<number, Consumption> = {};
    measurements : Record<number, Measurement[]> = {};

    types: string[];
    buildingsBaseURL = 'buildings';

    constructor(
        private dataService: DataService,
        private measurementService: MeasurementService
    ) {
    }

    createBuilding(building: CreateResidentialRequest): Observable<{
        message: string,
        aggregateId: string
    }> {
        return this.dataService.post<{
            message: string,
            aggregateId: string
        }>(building, this.buildingsBaseURL);
    }

    getBuildings(): Observable<Page<Building>> {
        return this.dataService.get<Page<Building>>(this.buildingsBaseURL);
    }

    getBuilding(id: string): Observable<Building> {
        const url = `${this.buildingsBaseURL}/${id}`;
        return this.dataService.get<Building>(url);
    }

    getConsumption(id: number): Observable<Consumption> {
        return this.consumptionsSubject.asObservable().pipe(map(consumptions => consumptions[id]));
    }

    getMeasurements(id: number): Observable<Measurement[]> {
        return this.measurementsSubject.asObservable().pipe(map(measurements => measurements[id]));
    }

    getBuildingTypes(): Observable<string[]> {
        return of(["Residential", "Commercial", "Industrial"])
    }

    getBuildingsFilter(selectedType: string, cityId: number, districtId: number, page: number, size: number): Observable<Page<Building>>{
        const url = `${this.buildingsBaseURL}/filter`;

        let params = new HttpParams();

        if (selectedType) {
            params = params.set('type', selectedType);
        }
        if (cityId) {
            params = params.set('cityId', cityId.toString());
        }
        if (districtId) {
            params = params.set('districtId', districtId.toString());
        }
        if (page){
            params = params.set('page', page.toString());
        }
        if (size) {
            params = params.set('size', size.toString());
        }

        return this.dataService.get<Page<Building>>(url, params);
    }

    addMeasurements(buildingId: string, measurements: Measurement[]) {
        return this.dataService.post({measurements: measurements}, `buildings/${buildingId}/measurements`)
    }

    getBuildingMeasurements(buildingId: string): Observable<Page<{
        id: string
        createdBy: string
        measurement: Measurement
    }>> {
        return this.dataService.get<Page<{
            id: string
            createdBy: string
            measurement: Measurement
            timestamp: Date
        }>>(`buildings/${buildingId}/measurements`);
    }

    private generateMockConsumption(id: number) {
        const consumption: Consumption = {
            Electricity: Math.floor(Math.random() * 10000) + 1,
            NaturalGas:Math.floor(Math.random() * 10000) + 1,
            Heating: Math.floor(Math.random() * 10000) + 1,
            Unit: 'MWh',
        };
        this.consumptions[id] = consumption;
        this.consumptionsSubject.next(this.consumptions);
    }

    private generateMockMeasurements(id: number) {
        const measurements: Measurement[] = [];

        for (let i = 0; i < 100; i++) {
            const units = ['kWh', 'mWh', 'Wh'];
            const measurement: Measurement = {
                buildingId: id,
                value: Math.floor(Math.random() * 100) + 1,
                unit: units[Math.floor(Math.random() * units.length)],
                timestamp: new Date().toISOString(),
                measurementType: this.types[Math.floor(Math.random() * this.types.length)],
                measurementTypeHeader: 'Electricity',
            };
            measurements.push(measurement);
        }
        this.measurements[id] = measurements;
        this.measurementsSubject.next(this.measurements);
    }
}
