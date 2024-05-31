import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Building } from '../../../energy/residential/common/building.model';
import { ResidentialService } from '../../../energy/residential/common/service/residential.service';
import {CityModel, District} from "../../../shared/city/city.model";
import {CityService} from "../../../shared/city/city.service";


@Component({
    selector: 'app-residentialReport',
    standalone: false,
    templateUrl: './report-list.component.html',
})
export class ReportListComponent implements OnInit {
    loading: boolean = false;
    selectedType: string = null;

    types: string[] = [];

    cities: CityModel[] = []
    districts: District[] = []
    selectedCity: CityModel = null;
    selectedDistrict: District = null;

    page = 3;
    totalPageCount = 0
    totalRecords = 0;
    rows = 10;
    last = this.rows * this.page

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
        this.getTableWithoutFilter()

        this.residentialService.getBuildingTypes().subscribe((types) => {
            this.types = types;
        })

        this.cityService.getCityById(34).subscribe((city) => {
            this.cities = [city];
            this.selectedCity = city;
            this.districts = Object.values(city.districts);
        })

    }

    onLazyLoads(event: any){
        this.rows = event.rows;
        this.page = event.first;
        this.applyFilter();
    }

    applyFilter() {

        this.residentialService.getBuildingsFilter(
            this.selectedType,
            this.selectedCity.id,
            this.selectedDistrict ? this.selectedDistrict.id : null,
            this.page,
            this.rows,
        ).subscribe((buildings) => {
            this.buildings = buildings.content;
        })
    }

    clear(table: Table) {
        this.selectedType = null;
        this.selectedDistrict = null;
        this.getTableWithoutFilter();
    }

    onRowSelect(building: Building) {
        this.router.navigate([building.id], { relativeTo: this.activatedRoute });
    }

    private getTableWithoutFilter(){
        this.residentialService.getBuildings().subscribe((buildings) => {
            this.page = buildings.number;
            this.totalPageCount = buildings.totalPages;
            this.totalRecords = buildings.totalElements;
            this.buildings = buildings.content;

            console.log(buildings);

            }
        )
    }
}

