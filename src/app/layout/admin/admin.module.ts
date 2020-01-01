import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PageHeaderModule } from './../../shared';
import { AngularMaterialModule } from '../../shared/AngularMaterial//angular-material.module';
import { AddUser } from './admin.component';

@NgModule({
    imports: [
        AdminRoutingModule,
        PageHeaderModule,
        AngularMaterialModule
    ],
    declarations: [AdminComponent, AddUser],
    entryComponents: [AddUser]
})
export class AdminModule { }
