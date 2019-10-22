import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PageHeaderModule } from './../../shared';
import {
    MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule,
    MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule,
    MatNativeDateModule, MatSnackBarModule,MatProgressSpinnerModule,MatSelectModule,
    MatSlideToggleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUser } from './admin.component';


@NgModule({
    imports: [CommonModule, AdminRoutingModule, PageHeaderModule, MatIconModule, MatSortModule,
        MatButtonModule, MatToolbarModule, MatDialogModule, MatCheckboxModule, MatTableModule, MatPaginatorModule,
        MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule,
        FormsModule, MatSnackBarModule,MatProgressSpinnerModule,MatSelectModule,MatSlideToggleModule
    ],
    declarations: [AdminComponent,AddUser],
    entryComponents: [AddUser]
})
export class AdminModule { }
