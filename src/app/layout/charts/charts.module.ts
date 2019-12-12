import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import {
    MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule,
    MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule,
    MatNativeDateModule, MatSnackBarModule,MatProgressSpinnerModule,MatSelectModule,
    MatSlideToggleModule,MatCardModule,MatGridListModule,MatRippleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AddUser } from './charts.component';
import { ProductDetails } from './charts.component';
import { PaymentCalaculation } from './charts.component';

@NgModule({
    imports: [CommonModule, Ng2Charts, ChartsRoutingModule, PageHeaderModule, MatIconModule, MatSortModule,
        MatButtonModule, MatToolbarModule, MatDialogModule, MatCheckboxModule, MatTableModule, MatPaginatorModule,
        MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule,
        FormsModule, MatSnackBarModule,MatProgressSpinnerModule,MatSelectModule,MatRippleModule,
        MatSlideToggleModule,MatCardModule,FlexLayoutModule,MatGridListModule],
    declarations: [ChartsComponent, AddUser,ProductDetails,PaymentCalaculation],
    entryComponents: [AddUser,ProductDetails,PaymentCalaculation]
})
export class ChartsModule { }
