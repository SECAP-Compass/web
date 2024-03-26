import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detail',
    standalone: false,
    templateUrl: './residential-detail.component.html',
})
export class ResidentialDetailComponent implements OnInit {
    id: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
    }
}
