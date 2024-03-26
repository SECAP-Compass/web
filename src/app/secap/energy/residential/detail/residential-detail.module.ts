import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentialDetailComponent } from './residential-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [ResidentialDetailComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: ResidentialDetailComponent },
        ]),
    ],
})
export class ResidentialDetailModule {}
