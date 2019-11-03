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
    MatSlideToggleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUser } from './charts.component';
import { ProductDetails } from './charts.component';

@NgModule({
    imports: [CommonModule, Ng2Charts, ChartsRoutingModule, PageHeaderModule, MatIconModule, MatSortModule,
        MatButtonModule, MatToolbarModule, MatDialogModule, MatCheckboxModule, MatTableModule, MatPaginatorModule,
        MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule,
        FormsModule, MatSnackBarModule,MatProgressSpinnerModule,MatSelectModule,
        MatSlideToggleModule],
    declarations: [ChartsComponent, AddUser,ProductDetails],
    entryComponents: [AddUser,ProductDetails]
})
export class ChartsModule { }
