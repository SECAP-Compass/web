import {Component, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ResidentialService} from "../common/service/residential.service";
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
import {Address, Area, Building} from "../common/building.model";
import {CreateResidentialRequest} from "../common/service/residential.request.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

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
        ToolbarModule,
        ToastModule
    ],
  templateUrl: './residential-create.component.html',
  styleUrl: './residential-create.component.scss'
})
export class ResidentialCreateComponent implements OnInit{
    city: CityModel;
    cities: CityModel[] = [];
    districts: District[];
    measurements: Measurement[] = [];

    units: string[] = ['m²'];

    residentialCreateForm: FormGroup = new FormGroup({
        area: new FormControl(0, Validators.required),
        areaUnit: new FormControl({ value: 'm²', disabled: true }, Validators.required),
        province: new FormControl({value: null, disabled: true}, Validators.required),
        district: new FormControl(null, Validators.required),
        neighborhood: new FormControl(null, Validators.required),
    });

    constructor(
        private cityService: CityService,
        private residentialService: ResidentialService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.cityService.getCityById(34).subscribe({
            next: (city) => {
                this.city = city;
                this.cities.push(city);
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

    onClickSave(){

        console.log(this.residentialCreateForm.value)

        const area: Area = {
            value: this.residentialCreateForm.get('area').value,
            unit: this.residentialCreateForm.get('areaUnit').value
        }

        const address: Address = {
            country: 'Turkey',
            region: 'Marmara',
            province: {
                id: this.city.id,
                value: this.city.name
            },
            district: {
                id: this.residentialCreateForm.get('district').value,
                value: this.districts.find(district => district.id === this.residentialCreateForm.get('district').value).name
            }
        }

        const building: CreateResidentialRequest = {
            area: area,
            address: address,
            buildingType: 'Residential'
        }


        this.residentialService.createBuilding(building).subscribe({
            next: (building) => {
            },
            error: (error) => {
                this.messageService.add({severity: 'error', summary:  'Error', detail: error.error.error });
                console.error('Error:', error);
            },
            complete: () => {
                this.router.navigate(['../'], { relativeTo: this.route });
            }
        });
    }

    private initForm() {
        this.residentialCreateForm.patchValue({
            province: this.city.id,
            district: this.districts[0].id,
            neighborhood: 'this should be dropdown too.'
        })
    }
}
