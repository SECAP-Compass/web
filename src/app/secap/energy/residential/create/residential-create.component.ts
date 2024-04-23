import {Component, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ResidentialService} from "../residential.service";
import {CityService} from "../../../shared/city/city.service";
import {CityModel, District} from "../../../shared/city/city.model";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {Measurement} from "../common/measurement.model";
import {MeasurementTableComponent} from "../common/components/measurement-table/measurement-table.component";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {RippleModule} from "primeng/ripple";
import {ToolbarModule} from "primeng/toolbar";

@Component({
  selector: 'app-residential-create',
  standalone: true,
    imports: [
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        FormsModule,
        ButtonModule,
        TableModule,
        MeasurementTableComponent,
        NgIf,
        PaginatorModule,
        ReactiveFormsModule,
        RippleModule,
        ToolbarModule
    ],
  templateUrl: './residential-create.component.html',
  styleUrl: './residential-create.component.scss'
})
export class ResidentialCreateComponent implements OnInit{
    city: CityModel;
    districts: District[];
    measurements: Measurement[] = [];

    units: string[] = ['m²', 'km²'];

    residentialCreateForm: FormGroup;

    constructor(private cityService: CityService) {
    }

    ngOnInit() {
        this.cityService.getCityById(34).subscribe({
            next: (city) => {
                this.city = city;
                this.districts = Object.values(this.city.districts);
            },
            error: (error) => {
                console.error('Error:', error);
            },
            complete: () => {
                this.initForm();
            }
        });
    }


    private initForm() {
        this.residentialCreateForm = new FormGroup({
            name: new FormControl('', Validators.required),
            area: new FormControl(0, Validators.required),
            areaUnit: new FormControl('m²', Validators.required),
            city: new FormControl(this.city.id, Validators.required),
            district: new FormControl(this.districts[0].id, Validators.required),
            neighborhood: new FormControl('this should be dropdown too.', Validators.required),
        });
    }
}
