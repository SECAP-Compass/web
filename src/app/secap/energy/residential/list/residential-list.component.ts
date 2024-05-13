import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Building } from '../common/building.model';
import { ResidentialService } from '../common/service/residential.service';
import {map} from "rxjs/operators";


@Component({
    selector: 'app-residential',
    standalone: false,
    templateUrl: './residential-list.component.html',
})
export class ResidentialListComponent implements OnInit {
    loading: boolean = false;

    buildings: Building[] = [];
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private residentialService: ResidentialService
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
    }

    onRowSelect(building: Building) {
        this.router.navigate([building.id], { relativeTo: this.activatedRoute });
    }

    onNew() {
        this.router.navigate(['new'], { relativeTo: this.activatedRoute });
    }
}

