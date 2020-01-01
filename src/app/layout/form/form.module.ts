import { NgModule } from '@angular/core';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { PageHeaderModule } from './../../shared';
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';
import { AddUser } from './form.component';

@NgModule({
    imports: [
        FormRoutingModule,
        PageHeaderModule,
        AngularMaterialModule],
    declarations: [FormComponent, AddUser],
    entryComponents: [AddUser]
})
export class FormModule { }
