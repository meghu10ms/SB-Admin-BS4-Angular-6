import { NgModule } from '@angular/core';
import { DispenserRoutingModule } from './dispenser-routing.module';
import { DispenserComponent } from './dispenser.component';
import { PageHeaderModule } from '../../shared';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from '../../shared/AngularMaterial/angular-material.module';
import { AddDispenser } from './dispenser.component'

@NgModule({
    imports: [
        NgbCarouselModule,
        DispenserRoutingModule,
        PageHeaderModule,
        AngularMaterialModule],
    declarations: [DispenserComponent, AddDispenser],
    entryComponents: [AddDispenser]
})
export class DispenserModule { }
