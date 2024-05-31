import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainReportPageModule } from './mainReportPage/main-report-page.module';
const routes: Routes = [
    {
        path: 'mainReportPage',
        loadChildren: () => import('./mainReportPage/main-report-page.module').then(m => m.MainReportPageModule)
    },
    {
      path: 'pieChartTest',
      loadChildren: () => import('./mainReportPage/dataView/pieChart/report-pie-chart.module').then(m => m.ReportPieChartModule)
    }
];

@NgModule({
  declarations: [ 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainReportPageModule
  ]
})
export class MainPageModule { }
