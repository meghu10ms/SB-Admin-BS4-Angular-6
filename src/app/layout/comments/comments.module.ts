import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments.component';
import { PageHeaderModule } from './../../shared';
import {
    MatIconModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTooltipModule
} from '@angular/material';

@NgModule({
    imports: [CommonModule, CommentsRoutingModule, PageHeaderModule, MatIconModule,
        MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule,
        MatButtonModule, MatFormFieldModule, MatInputModule, MatTooltipModule],
    declarations: [CommentsComponent]
})
export class CommentsModule { }
