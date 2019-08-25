import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { PageHeaderModule } from './../../shared';
import {MatIconModule,MatButtonModule,MatToolbarModule,MatDialogModule,
    MatCheckboxModule,MatTableModule,MatPaginatorModule,MatSortModule,
    MatFormFieldModule,MatInputModule,MatTooltipModule} from '@angular/material';
import {AddUser} from './supplier.component';


@NgModule({
    imports: [CommonModule, SupplierRoutingModule, PageHeaderModule,MatIconModule,MatSortModule,
        MatButtonModule,MatToolbarModule,MatDialogModule,MatCheckboxModule,MatTableModule,MatPaginatorModule,
        MatFormFieldModule,MatInputModule,MatTooltipModule
    ],
    declarations: [SupplierComponent,AddUser],
    entryComponents:[AddUser]
})
export class SupplierModule {}
