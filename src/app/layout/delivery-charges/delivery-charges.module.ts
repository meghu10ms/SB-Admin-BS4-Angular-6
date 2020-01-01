import { NgModule } from '@angular/core';
import { DeliveryChargesRoutingModule } from './delivery-charges-routing.module';
import { DeliveryChargesComponent } from './delivery-charges.component';
import { PageHeaderModule } from '../../shared';
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';
import { DeliveryCharge } from './delivery-charges.component';

@NgModule({
    imports: [
        DeliveryChargesRoutingModule,
        PageHeaderModule,
        AngularMaterialModule],
    declarations: [DeliveryChargesComponent, DeliveryCharge],
    entryComponents: [DeliveryCharge]
})
export class DeliveryChargesModule { }
