import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { CommonServiceService } from '../common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    visible: any;
    loginForm: FormGroup;
    forgotPassword:boolean;

    constructor(
        public router: Router,
        private cds: CommonServiceService,
        private snackBar: MatSnackBar,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.forgotPassword = false;
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
        //this.router.navigate(['/dashboard']);


        if (this.loginForm.valid) {

            var values = this.loginForm.value;
            var enteredData = { "email": values.email, "password": values.password }
            this.visible = true;
            this.cds.getLogin(enteredData).subscribe(response => {
                this.visible = false;
                this.cds.tokenLogin = response["token"];
                this.cds.getCurentAdminDetails(this.cds.tokenLogin).subscribe(response => {
                    this.visible = false;
                    this.forgotPassword = false;
                    var val = JSON.stringify(response);
                    this.cds.currentAdminDetail = JSON.parse(val);
                    this.router.navigate(['/dashboard']);
                }, error => {
                    this.visible = false;
                    this.snackBar.open(error.error.message, "", {
                        duration: 2000,
                    });
                })

            }, error => {
                this.visible = false;
                this.forgotPassword = true;
                this.snackBar.open(error.error.message, "", {
                    duration: 2000,
                });
            })
        } else {
            this.snackBar.open("Please Enter All values", "", {
                duration: 2000,
            });
        }
    }
    onForgetPassword(){
        this.router.navigate(['/signup']);
    }
}
