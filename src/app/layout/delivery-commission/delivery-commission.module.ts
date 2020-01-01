import { NgModule } from '@angular/core';
import { DeliveryCommissionRoutingModule } from './delivery-commission-routing.module';
import { DeliveryCommissionComponent } from './delivery-commission.component';
import { PageHeaderModule } from '../../shared';
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';
import { DeliveryCom } from './delivery-commission.component';

@NgModule({
    imports: [
        DeliveryCommissionRoutingModule,
        PageHeaderModule,
        AngularMaterialModule],
    declarations: [DeliveryCommissionComponent, DeliveryCom],
    entryComponents: [DeliveryCom]
})
export class DeliveryCommissionModule { }
