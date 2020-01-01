import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule,
  MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule,
  MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule,
  MatNativeDateModule, MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule,
  MatSlideToggleModule, MatStepperModule, MatChipsModule
} from '@angular/material/';
@NgModule({
  declarations: [],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule,
    MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule,
    MatNativeDateModule, MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule,
    MatSlideToggleModule, MatStepperModule, MatChipsModule
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule,
    MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule,
    MatNativeDateModule, MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule,
    MatSlideToggleModule, MatStepperModule, MatChipsModule
  ]
})
export class AngularMaterialModule { }
