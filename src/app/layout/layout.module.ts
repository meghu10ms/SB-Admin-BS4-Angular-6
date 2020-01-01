import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './components/confirmation-dialog/confirmation-dialog.service';
import { ViewProfile } from './components/header/header.component';
import { ChangePassword } from './components/header/header.component';
import { AngularMaterialModule } from '../shared/AngularMaterial/angular-material.module';

@NgModule({
    imports: [
        NgbModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        AngularMaterialModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, ViewProfile, ChangePassword, ConfirmationDialogComponent],
    entryComponents: [ViewProfile, ChangePassword, ConfirmationDialogComponent],
    providers: [ConfirmationDialogService],
    exports: [ConfirmationDialogComponent]

})
export class LayoutModule { }
