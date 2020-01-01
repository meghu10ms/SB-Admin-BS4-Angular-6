import { NgModule } from '@angular/core';
import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';
import { AddUser } from './tables.component';

@NgModule({
    imports: [
        TablesRoutingModule,
        PageHeaderModule,
        AngularMaterialModule],
    declarations: [TablesComponent, AddUser],
    entryComponents: [AddUser]
})
export class TablesModule { }
