import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryCommissionComponent } from './delivery-commission.component';

const routes: Routes = [
    {
        path: '',
        component: DeliveryCommissionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryCommissionRoutingModule { }
