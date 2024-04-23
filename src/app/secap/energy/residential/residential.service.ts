import {Injectable, OnInit} from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { Building } from './common/building.model';
import { Consumption } from './common/consumption.model';
import { Measurement } from './common/measurement.model';
import {MeasurementService} from "../../shared/measurement/measurement.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class ResidentialService {
    private buildings: Building[] = [
        {
            id: 1,
            name: 'Building 1',
            province: 'Province 1',
            district: 'District 1',
            neighbourhood: 'Neighbourhood 1',
            energy: 100,
        },
        {
            id: 2,
            name: 'Building 2',
            province: 'Province 2',
            district: 'District 2',
            neighbourhood: 'Neighbourhood 2',
            energy: 200,
        },
        {
            id: 29,
            name: 'Building 29',
            province: 'Province 29',
            district: 'District 29',
            neighbourhood: 'Neighbourhood 29',
            energy: 2900,
        },
        {
            id: 30,
            name: 'Building 30',
            province: 'Province 30',
            district: 'District 30',
            neighbourhood: 'Neighbourhood 30',
            energy: 3000,
        },
        {
            id: 31,
            name: 'Building 31',
            province: 'Province 31',
            district: 'District 31',
            neighbourhood: 'Neighbourhood 31',
            energy: 3100,
        },
        {
            id: 32,
            name: 'Building 32',
            province: 'Province 32',
            district: 'District 32',
            neighbourhood: 'Neighbourhood 32',
            energy: 3200,
        },
        {
            id: 59,
            name: 'Building 59',
            province: 'Province 59',
            district: 'District 59',
            neighbourhood: 'Neighbourhood 59',
            energy: 5900,
        },
        {
            id: 60,
            name: 'Building 60',
            province: 'Province 60',
            district: 'District 60',
            neighbourhood: 'Neighbourhood 60',
            energy: 6000,
        },
    ];

    private consumptionsSubject: BehaviorSubject<Record<number, Consumption>> = new BehaviorSubject({});
    private measurementsSubject: BehaviorSubject<Record<number, Measurement[]>> = new BehaviorSubject({});

    consumptions : Record<number, Consumption> = {};
    measurements : Record<number, Measurement[]> = {};

    types: string[];

    constructor(private measurementService: MeasurementService) {
        this.measurementService.getMeasurementTypes().subscribe((types) => {
            this.types = types;
            this.buildings.forEach((building) => {
                this.generateMockConsumption(building.id);
                this.generateMockMeasurements(building.id);
            });
        });
    }

    getBuildings(): Building[] {
        return this.buildings;
    }

    getBuilding(id: number): Building {
        return this.buildings.find((building) => building.id === id);
    }

    getConsumption(id: number): Observable<Consumption> {
        return this.consumptionsSubject.asObservable().pipe(map(consumptions => consumptions[id]));
    }

    getMeasurements(id: number): Observable<Measurement[]> {
        return this.measurementsSubject.asObservable().pipe(map(measurements => measurements[id]));
    }

    getTypes(): string[] {
        return this.types;
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
                id: i,
                buildingId: id,
                amount: Math.floor(Math.random() * 100) + 1,
                unit: units[Math.floor(Math.random() * units.length)],
                timestamp: new Date().toISOString(),
                type: this.types[Math.floor(Math.random() * this.types.length)],
            };
            measurements.push(measurement);
        }
        this.measurements[id] = measurements;
        this.measurementsSubject.next(this.measurements);
    }
}
