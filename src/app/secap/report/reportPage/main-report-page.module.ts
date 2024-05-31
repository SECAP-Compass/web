import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {ToolbarModule} from "primeng/toolbar";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from "primeng/dialog";
import { MainReportPageComponent } from './main-report-page.component';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    declarations: [MainReportPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        RouterModule.forChild([
            {path: '', component: MainReportPageComponent}
        ]),
        ToolbarModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        PanelModule,
        CardModule,
        CalendarModule,
        ChartModule,
        CheckboxModule
    ],
})
export class MainReportPageModule { }
