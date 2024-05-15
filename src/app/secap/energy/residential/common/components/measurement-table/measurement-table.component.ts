import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
    @Output() measurementsChange = new EventEmitter<Measurement>();

    createDialog: boolean = false;
    createMeasurementForm  = new FormGroup({
        typeHeader: new FormControl<string>(null, Validators.required),
        type: new FormControl<string>(null, Validators.required),
        amount: new FormControl<number>(null, Validators.required),
        unit: new FormControl<string>(null, Validators.required),
        timestamp: new FormControl<Date>(null, Validators.required)
    });


    measurementTypeHeaders: string[] = []
    measurementTypes: string[] = [];
    mtMap: Map<string, string[]> = new Map<string, string[]>();

    units: string[] = [];

    constructor(private measurementService: MeasurementService) {}

    ngOnInit() {

    }

    onAddMeasurement() {
        this.measurementService.getMeasurementTypeHeaders().subscribe({
            next: measurementTypes => {
                this.mtMap = measurementTypes;
            },
            error: error => {
                console.error('Error:', error);
            },
            complete: () => {
                this.measurementTypeHeaders = Object.keys(this.mtMap);
                this.measurementTypes = this.mtMap[this.measurementTypeHeaders[0]];
                this.initForm()
            }
        });


        this.measurementService.getMeasurementUnits().subscribe({
            next: units => {
                this.units = units.measurementUnits;
            },
            error: error => {
                console.error('Error:', error);
            }
        });

        this.createDialog = true;
    }

    onClickSubmit() {
        this.createMeasurementForm.get('type')
        let measurement: Measurement = {
            buildingId: 1,
            amount: this.createMeasurementForm.get('amount').value,
            unit: this.createMeasurementForm.get('unit').value,
            timestamp: this.createMeasurementForm.get('timestamp').value.toISOString(),
            type: this.createMeasurementForm.get('type').value,
            typeHeader: this.createMeasurementForm.get('typeHeader').value
        }

        this.measurements.push(measurement)
        this.measurementsChange.emit(measurement);
        this.createDialog = false;
    }

    onHeaderChange(event: any){
        this.measurementTypes = this.mtMap[event.value];
        this.createMeasurementForm.patchValue({
            type: this.measurementTypes[0],
            typeHeader: event.value
        })
    }

    private initForm() {
        this.createMeasurementForm.patchValue({
            typeHeader: this.measurementTypeHeaders[0],
            type: this.measurementTypes[0],
            unit: this.units[0],
            amount: 0,
            timestamp: new Date()
        })
    }
}
