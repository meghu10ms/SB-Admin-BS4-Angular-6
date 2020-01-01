import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';

import { StatModule } from '../../shared';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';

@NgModule({
    imports: [
        NgbCarouselModule,
        DashboardRoutingModule,
        StatModule,
        AmChartsModule,
        AngularMaterialModule,
        NgbAlertModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ]
})
export class DashboardModule { }
