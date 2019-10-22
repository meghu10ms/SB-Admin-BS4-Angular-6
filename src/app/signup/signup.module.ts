import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { MatFormFieldModule, MatInputModule, MatSnackBarModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SignupRoutingModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
