import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResidentialCreateComponent } from "./create/residential-create.component";

const routes: Routes = [
    {
        path: 'new',
        component: ResidentialCreateComponent,
    },
    {
        path: ':id',
        loadChildren: () =>
            import('./detail/residential-detail.module').then(
                (m) => m.ResidentialDetailModule
            ),
    },
    {
        path: '',
        loadChildren: () =>
            import('./list/residential-list.module').then(
                (m) => m.ResidentialListModule
            ),
    },


];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ResidentialCreateComponent
    ],
})
export class ResidentialModule {}
