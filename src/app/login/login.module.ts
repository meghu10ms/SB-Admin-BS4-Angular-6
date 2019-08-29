import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {MatFormFieldModule,MatInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatInputModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
