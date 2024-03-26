import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./list/residential-list.module').then(
                (m) => m.ResidentialListModule
            ),
    },
    {
        path: ':id',
        loadChildren: () =>
            import('./detail/residential-detail.module').then(
                (m) => m.ResidentialDetailModule
            ),
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ResidentialModule {}
