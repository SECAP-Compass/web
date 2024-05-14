import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Building } from '../common/building.model';
import { ResidentialService } from '../common/service/residential.service';
import {map} from "rxjs/operators";
import {CityModel, District} from "../../../shared/city/city.model";
import {CityService} from "../../../shared/city/city.service";


@Component({
    selector: 'app-residential',
    standalone: false,
    templateUrl: './residential-list.component.html',
})
export class ResidentialListComponent implements OnInit {
    loading: boolean = false;
    selectedType: string = null;

    types: string[] = [];

    cities: CityModel[] = []
    districts: District[] = []
    selectedCity: CityModel = null;
    selectedDistrict: District = null;

    buildings: Building[] = [];
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private residentialService: ResidentialService,
        private cityService: CityService
    ) {
        // Constructor logic
    }

    ngOnInit() {
        this.residentialService.getBuildings().pipe(
            map((page) => page.content)
        ).subscribe((buildings) => {
            this.buildings = buildings;
            }
        )

        this.residentialService.getBuildingTypes().subscribe((types) => {
            this.types = types;
        })

        this.cityService.getCityById(34).subscribe((city) => {
            this.cities = [city];
            this.selectedCity = city;
            this.districts = Object.values(city.districts);
        })

    }

    applyFilter() {
        console.log(this.selectedType, this.selectedCity, this.selectedDistrict)

        this.residentialService.getBuildingsFilter(
            this.selectedType,
            this.selectedCity.id,
            this.selectedDistrict ? this.selectedDistrict.id : null
        ).subscribe((buildings) => {
            this.buildings = buildings.content;
        })
    }

    clear(table: Table) {
        this.selectedType = null;
        this.selectedDistrict = null;
        table.clear();
    }

    onRowSelect(building: Building) {
        this.router.navigate([building.id], { relativeTo: this.activatedRoute });
    }

    onNew() {
        this.router.navigate(['new'], { relativeTo: this.activatedRoute });
    }
}

