import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxComponent } from './tax.component';

const routes: Routes = [
    {
        path: '',
        component: TaxComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaxRoutingModule { }
