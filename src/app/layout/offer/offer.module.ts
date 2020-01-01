import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer.component';
import { PageHeaderModule } from '../../shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewOffer } from './offer.component';
import { DatePipe } from '@angular/common';


@NgModule({
    imports: [
        OfferRoutingModule,
        PageHeaderModule,
        FlexLayoutModule,
        AngularMaterialModule
    ],
    declarations: [OfferComponent, ViewOffer],
    entryComponents: [ViewOffer],
    providers: [
        DatePipe
    ],
})
export class OfferModule { }
