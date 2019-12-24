import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { DispenserRoutingModule } from './dispenser-routing.module';
import { DispenserComponent } from './dispenser.component';
import { PageHeaderModule } from '../../shared';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {
    MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule,
    MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule,
    MatNativeDateModule, MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule,
    MatSlideToggleModule, MatCardModule, MatGridListModule, MatRippleModule, MatChipsModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddDispenser } from './dispenser.component'

@NgModule({
    imports: [CommonModule,NgbCarouselModule,NgbAlertModule, Ng2Charts, DispenserRoutingModule, PageHeaderModule, MatIconModule, MatSortModule,
        MatButtonModule, MatToolbarModule, MatDialogModule, MatCheckboxModule, MatTableModule, MatPaginatorModule,
        MatFormFieldModule, MatInputModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule,
        FormsModule, MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule, MatRippleModule,
        MatSlideToggleModule, MatCardModule, FlexLayoutModule, MatGridListModule, MatChipsModule],
    declarations: [DispenserComponent, AddDispenser],
    entryComponents: [AddDispenser]
})
export class DispenserModule { }
