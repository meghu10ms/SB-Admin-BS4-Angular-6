import { NgModule } from '@angular/core';
import { TaxRoutingModule } from './tax-routing.module';
import { TaxComponent } from './tax.component';
import { PageHeaderModule } from '../../shared';
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';
import { AddTax } from './tax.component';

@NgModule({
    imports: [
        TaxRoutingModule,
        PageHeaderModule,
        AngularMaterialModule],
    declarations: [TaxComponent, AddTax],
    entryComponents: [AddTax]
})
export class TaxModule { }
