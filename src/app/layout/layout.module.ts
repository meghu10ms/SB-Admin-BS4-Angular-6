import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import {MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,MatFormFieldModule, MatInputModule,MatSnackBarModule,
    MatExpansionModule} from '@angular/material';
import { ViewProfile } from './components/header/header.component';
import { ChangePassword } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        MatDialogModule,
        MatMenuModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,MatFormFieldModule, MatInputModule,MatSnackBarModule,MatExpansionModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent,ViewProfile,ChangePassword],
    entryComponents: [ViewProfile,ChangePassword]
})
export class LayoutModule {}
