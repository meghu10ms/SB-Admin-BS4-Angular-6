import { NgModule } from '@angular/core';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';
import { AddUser } from './charts.component';
import { ProductDetails } from './charts.component';
import { PaymentCalaculation } from './charts.component';

@NgModule({
    imports: [
        ChartsRoutingModule,
        PageHeaderModule,
        AngularMaterialModule],
    declarations: [ChartsComponent, AddUser, ProductDetails, PaymentCalaculation],
    entryComponents: [AddUser, ProductDetails, PaymentCalaculation]
})
export class ChartsModule { }
