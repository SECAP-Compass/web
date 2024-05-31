import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GasType, MeasurementDate, MeasurementTypeHeader } from 'src/app/secap/shared/measurement/measurement-type.model';
import { MeasurementService } from 'src/app/secap/shared/measurement/measurement.service';

@Component({
    selector: 'app-tabular',
    standalone: false,
    templateUrl: './tabular.component.html',
})
export class TabularComponent implements OnInit {

    columns:string[] = null;
  
    constructor(private router: Router,private measurementService:MeasurementService) {}

    ngOnInit(): void {
        
    }


}
