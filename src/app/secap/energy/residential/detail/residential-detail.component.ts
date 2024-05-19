import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Building } from '../common/building.model';
import { ResidentialService } from '../common/service/residential.service';
import { Consumption } from '../common/consumption.model';
import { Measurement } from '../common/measurement.model';
import {BehaviorSubject} from "rxjs";
import {MeasurementService} from "../../../shared/measurement/measurement.service";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-detail',
    standalone: false,
    templateUrl: './residential-detail.component.html',
})
export class ResidentialDetailComponent implements OnInit {
    id: string;
    building: Building = null;
    consumption: Consumption;
    measurements: Measurement[] = [];
    uncommitedMeasurements: Measurement[] = [];

    saveButtonDisabled: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private messageService: MessageService,
        private residentialService: ResidentialService,
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');

        this.residentialService.getBuilding(this.id).subscribe(
            b => {
                this.building = b
            }
        );

        this.residentialService.getBuildingMeasurements(this.id).subscribe(
            value => {
                this.measurements = value.content.map(it => it.measurement);
            }
        );
    }

    onMeasurementsChange(measurements: Measurement) {
        this.uncommitedMeasurements.push(measurements);
        this.measurements.push(measurements);
        this.saveButtonDisabled = false;
    }

    onSave() {
        this.residentialService.addMeasurements(this.id, this.uncommitedMeasurements).subscribe({
            next: () => {
                this.saveButtonDisabled = true;
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.messageService.add({severity:'success', summary:'Success', detail:'Measurements saved, it may take a few minutes to update the data.'});
            }
        });
    }

}
