import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Building } from '../common/building.model';


@Component({
    selector: 'app-residential',
    standalone: false,
    templateUrl: './residential-list.component.html',
})
export class ResidentialListComponent {
    loading: boolean = false;

    filter: any = {
        name: '',
        district: '',
        province: '',
        neighbourhood: '',
    };

    buildings: Building[] = [
        {
            id: 1,
            name: 'Building 1',
            province: 'Province 1',
            district: 'District 1',
            neighbourhood: 'Neighbourhood 1',
            energy: 100,
        },
        {
            id: 2,
            name: 'Building 2',
            province: 'Province 2',
            district: 'District 2',
            neighbourhood: 'Neighbourhood 2',
            energy: 200,
        },
        {
            id: 29,
            name: 'Building 29',
            province: 'Province 29',
            district: 'District 29',
            neighbourhood: 'Neighbourhood 29',
            energy: 2900,
        },
        {
            id: 30,
            name: 'Building 30',
            province: 'Province 30',
            district: 'District 30',
            neighbourhood: 'Neighbourhood 30',
            energy: 3000,
        },
        {
            id: 31,
            name: 'Building 31',
            province: 'Province 31',
            district: 'District 31',
            neighbourhood: 'Neighbourhood 31',
            energy: 3100,
        },
        {
            id: 32,
            name: 'Building 32',
            province: 'Province 32',
            district: 'District 32',
            neighbourhood: 'Neighbourhood 32',
            energy: 3200,
        },
        {
            id: 59,
            name: 'Building 59',
            province: 'Province 59',
            district: 'District 59',
            neighbourhood: 'Neighbourhood 59',
            energy: 5900,
        },
        {
            id: 60,
            name: 'Building 60',
            province: 'Province 60',
            district: 'District 60',
            neighbourhood: 'Neighbourhood 60',
            energy: 6000,
        },
        {
            id: 1,
            name: 'Building 1',
            province: 'Province 1',
            district: 'District 1',
            neighbourhood: 'Neighbourhood 1',
            energy: 100,
        },
        {
            id: 2,
            name: 'Building 2',
            province: 'Province 2',
            district: 'District 2',
            neighbourhood: 'Neighbourhood 2',
            energy: 200,
        },
        {
            id: 29,
            name: 'Building 29',
            province: 'Province 29',
            district: 'District 29',
            neighbourhood: 'Neighbourhood 29',
            energy: 2900,
        },
        {
            id: 30,
            name: 'Building 30',
            province: 'Province 30',
            district: 'District 30',
            neighbourhood: 'Neighbourhood 30',
            energy: 3000,
        },
        {
            id: 31,
            name: 'Building 31',
            province: 'Province 31',
            district: 'District 31',
            neighbourhood: 'Neighbourhood 31',
            energy: 3100,
        },
        {
            id: 32,
            name: 'Building 32',
            province: 'Province 32',
            district: 'District 32',
            neighbourhood: 'Neighbourhood 32',
            energy: 3200,
        },
        {
            id: 59,
            name: 'Building 59',
            province: 'Province 59',
            district: 'District 59',
            neighbourhood: 'Neighbourhood 59',
            energy: 5900,
        },
        {
            id: 60,
            name: 'Building 60',
            province: 'Province 60',
            district: 'District 60',
            neighbourhood: 'Neighbourhood 60',
            energy: 6000,
        },
    ];

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        // Constructor logic
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

