import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { CommonServiceService } from '../common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    constructor(private cds: CommonServiceService,
        private snackBar: MatSnackBar,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.forgotPasswordForm = this.fb.group({
            email: ['', Validators.required]
        })
    }
    onChangePassword() {
        if (this.forgotPasswordForm.invalid) {
            this.snackBar.open("Enter Valid Email", "", {
                duration: 2000,
            });
            return;
        }
        var data = this.forgotPasswordForm.value;
        this.cds.forgotPassword(data).subscribe(response => {
            this.snackBar.open(response["message"], "", {
                duration: 2000,
            });
        }, error => {
            this.snackBar.open(error.error.message, "", {
                duration: 2000,
            });
        })

    }

}
