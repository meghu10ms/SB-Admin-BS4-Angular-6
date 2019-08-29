import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { StatModule } from '../../shared';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        DashboardRoutingModule,
        StatModule,
        AmChartsModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule { }
