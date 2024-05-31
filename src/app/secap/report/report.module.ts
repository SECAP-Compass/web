import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'residentialReport',
        loadChildren: () => import('./residentialReport/residentialReport.module').then(m => m.ResidentailReportModule)
    },
    {
        path: 'mainReportPage',
        loadChildren: () => import('./common/mainReportPage/main-report-page.module').then(m => m.MainReportPageModule)
    },
    {
        path: 'pieChartTest',
        loadChildren: () => import('./common/mainReportPage/dataView/pieChart/report-pie-chart.module').then(m => m.ReportPieChartModule)
    }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportModule { }
