import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispenserComponent } from './dispenser.component';

const routes: Routes = [
    {
        path: '',
        component: DispenserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DispenserRoutingModule { }
