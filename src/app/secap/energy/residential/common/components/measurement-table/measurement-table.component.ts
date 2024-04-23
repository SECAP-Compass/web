import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Measurement} from "../../measurement.model";
import {DialogModule} from "primeng/dialog";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {MeasurementService} from "../../../../../shared/measurement/measurement.service";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-measurement-table',
  standalone: true,
    imports: [
        ButtonModule,
        SharedModule,
        TableModule,
        DialogModule,
        InputTextModule,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        InputNumberModule,
        CalendarModule,
        DropdownModule
    ],
  templateUrl: './measurement-table.component.html',
  styleUrl: './measurement-table.component.scss'
})
export class MeasurementTableComponent implements OnInit {

    @Input() measurements: Measurement[];
    createDialog: boolean = false;
    createMeasurementForm: FormGroup;
    measurementTypes: string[];

    units: string[] = ['kWh', 'm3', 'lt', 'kg', 'ton', 'm2', 'm3', 'm', 'cm', 'mm', 'lt'];

    constructor(private measurementService: MeasurementService) {}

    ngOnInit() {}

    onAddMeasurement() {
        this.measurementService.getMeasurementTypes().subscribe({
            next: measurementTypes => {
                this.measurementTypes = measurementTypes;
            },
            error: error => {
                console.error('Error:', error);
            },
            complete: () => {
                this.initForm();
            }
        });

        this.createDialog = true;
    }

    onClickSubmit() {
        this.createDialog = false;
    }

    private initForm() {
        this.createMeasurementForm = new FormGroup({
            type: new FormControl(this.measurementTypes[0], Validators.required),
            amount: new FormControl(null, Validators.required),
            unit: new FormControl(this.units[0], Validators.required),
            timestamp: new FormControl(null, Validators.required)
        });
    }
}
