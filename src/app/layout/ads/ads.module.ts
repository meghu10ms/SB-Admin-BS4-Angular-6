import { NgModule } from '@angular/core';
import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';
import { PageHeaderModule } from './../../shared';
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';
import { ViewAd } from './ads.component';

@NgModule({
    imports: [
        AdsRoutingModule,
        PageHeaderModule,
        AngularMaterialModule
    ],
    declarations: [AdsComponent, ViewAd],
    entryComponents: [ViewAd]
})
export class AdsModule { }
