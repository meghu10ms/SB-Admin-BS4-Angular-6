import { NgModule } from '@angular/core';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { PageHeaderModule } from './../../shared';
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';
import { AddUser } from './supplier.component';
import { PaymentCalaculation } from './supplier.component';


@NgModule({
    imports: [
        SupplierRoutingModule,
        PageHeaderModule,
        AngularMaterialModule
    ],
    declarations: [SupplierComponent, AddUser, PaymentCalaculation],
    entryComponents: [AddUser, PaymentCalaculation]
})
export class SupplierModule { }
