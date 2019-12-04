import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'comments', loadChildren: () => import('./comments/comments.module').then(m => m.CommentsModule) },
            { path: 'supplier', loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule) },           
            { path: 'area', loadChildren: () => import('./area/area.module').then(m => m.AreaModule) },           
            { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },           
            { path: 'ads', loadChildren: () => import('./ads/ads.module').then(m => m.AdsModule) }, 
            { path: 'offer', loadChildren: () => import('./offer/offer.module').then(m => m.OfferModule) },           
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
