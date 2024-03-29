import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Building } from '../common/building.model';
import { ResidentialService } from '../residential.service';
import { Consumption } from '../common/consumption.model';
import { Measurement } from '../common/measurement.model';

@Component({
    selector: 'app-detail',
    standalone: false,
    templateUrl: './residential-detail.component.html',
})
export class ResidentialDetailComponent implements OnInit {
    id: string;
    building: Building;
    consumption: Consumption;
    measurements: Measurement[] = [];
    loading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private residentialService: ResidentialService
    ) {}

    ngOnInit() {
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.building = this.residentialService.getBuilding(id);
        this.consumption = this.residentialService.getConsumption(id);
        this.measurements = this.residentialService.getMeasurements(id);
    }
}
