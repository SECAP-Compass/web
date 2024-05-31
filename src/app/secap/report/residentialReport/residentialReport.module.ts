import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportListModule } from './list/report-list.module'

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./list/report-list.module').then(
                (m) => m.ReportListModule
            ),
    },
    {
        path: ':id',
        loadChildren: () =>
            import('../common/main-page-module').then(
                (m) => m.MainPageModule
            ),
    },


];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReportListModule
    ],
})
export class ResidentailReportModule {}
