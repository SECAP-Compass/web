import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'residentialReport',
        loadChildren: () => import('./residentialReport/residentialReport.module').then(m => m.ResidentailReportModule)
    },
    {
        path: 'reportPage',
        loadChildren: () => import('./reportPage/main-report-page.module').then(m => m.MainReportPageModule)
    },
    {
      path:'cityReport',
      loadChildren: () => import('./listCity/list-city.module').then(m => m.ListCityModule)
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
