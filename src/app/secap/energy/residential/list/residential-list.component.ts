import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Building } from '../common/building.model';
import { ResidentialService } from '../residential.service';


@Component({
    selector: 'app-residential',
    standalone: false,
    templateUrl: './residential-list.component.html',
})
export class ResidentialListComponent implements OnInit {
    loading: boolean = false;

    filter: any = {
        name: '',
        district: '',
        province: '',
        neighbourhood: '',
    };

    buildings: Building[] = [];
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private residentialService: ResidentialService
    ) {
        // Constructor logic
    }

    ngOnInit() {
        this.buildings = this.residentialService.getBuildings();
    }

    applyFilter() {
        // Filter logic
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onRowSelect(building: Building) {
        this.router.navigate([building.id], { relativeTo: this.activatedRoute });
    }
}

