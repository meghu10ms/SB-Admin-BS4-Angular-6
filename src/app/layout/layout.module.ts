import { NgModule } from '@angular/core';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './components/confirmation-dialog/confirmation-dialog.service';
import {
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule,
    MatExpansionModule, MatChipsModule, MatTooltipModule
} from '@angular/material';
import { ViewProfile } from './components/header/header.component';
import { ChangePassword } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        MatDialogModule,
        MatMenuModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatChipsModule,
        MatTooltipModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, ViewProfile, ChangePassword,ConfirmationDialogComponent],
    entryComponents: [ViewProfile, ChangePassword,ConfirmationDialogComponent],
    providers: [ ConfirmationDialogService],
    exports:[ConfirmationDialogComponent]
    
})
export class LayoutModule { }
