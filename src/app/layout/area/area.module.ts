import { NgModule } from '@angular/core';
import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';
import { PageHeaderModule } from './../../shared';
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';
import { AddArea } from './area.component';

@NgModule({
    imports: [
        AreaRoutingModule,
        PageHeaderModule,
        AngularMaterialModule
    ],
    declarations: [AreaComponent, AddArea],
    entryComponents: [AddArea]
})
export class AreaModule { }
