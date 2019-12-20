import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { DeliveryCommissionRoutingModule } from './delivery-commission-routing.module';
import { DeliveryCommissionComponent } from './delivery-commission.component';
import { PageHeaderModule } from '../../shared';
import {
    MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule,
    MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule,
    MatNativeDateModule, MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule,
    MatSlideToggleModule, MatCardModule, MatGridListModule, MatRippleModule, MatChipsModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeliveryCom } from './delivery-commission.component';

@NgModule({
    imports: [CommonModule, Ng2Charts, DeliveryCommissionRoutingModule, PageHeaderModule, MatIconModule, MatSortModule,
        MatButtonModule, MatToolbarModule, MatDialogModule, MatCheckboxModule, MatTableModule, MatPaginatorModule,
        MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule,
        FormsModule, MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule, MatRippleModule,
        MatSlideToggleModule, MatCardModule, FlexLayoutModule, MatGridListModule, MatChipsModule],
    declarations: [DeliveryCommissionComponent, DeliveryCom],
    entryComponents: [DeliveryCom]
})
export class DeliveryCommissionModule { }
