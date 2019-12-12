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
    forgotPassword: boolean;

    constructor(
        public router: Router,
        private cds: CommonServiceService,
        private snackBar: MatSnackBar,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        if (sessionStorage.getItem('isLoggedin')) {
            this.cds.tokenLogin = sessionStorage.getItem('authToken')
            this.visible = true;
            this.cds.getCurentAdminDetails(this.cds.tokenLogin).subscribe(response => {
                this.visible = false;
                var val = JSON.stringify(response);
                this.cds.currentAdminDetail = JSON.parse(val);
                this.cds.getAllAraeDetails(this.cds.tokenLogin).subscribe(response => {
                    this.visible = false;
                    this.cds.areaData = this.getAreaData(response["areas"]);
                    this.router.navigate(['/dashboard']);
                }, error => {
                    this.visible = false;
                    this.snackBar.open(error.error.message, "", {
                        duration: 2000,
                    });
                })

            }, error => {
                this.visible = false;
                this.snackBar.open(error.error.message, "", {
                    duration: 2000,
                });
            })
        } else {
            this.forgotPassword = false;
        }

        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })

    }

    onLoggedin() {
        if (this.loginForm.valid) {
            var values = this.loginForm.value;
            var enteredData = { "email": values.email, "password": values.password }
            this.visible = true;
            this.cds.getLogin(enteredData).subscribe(response => {
                this.forgotPassword = false;
                this.visible = false;
                sessionStorage.setItem('isLoggedin', 'true');
                sessionStorage.setItem('authToken', response["token"]);
                this.cds.tokenLogin = response["token"];
                this.router.navigate(['/not-found']);
                // this.cds.getAllAraeDetails(this.cds.tokenLogin).subscribe(response => {
                //     this.visible = false;
                //     this.cds.areaData = this.getAreaData(response["areas"]);
                //     this.router.navigate(['/not-found']);
                // }, error => {
                //     this.visible = false;
                //     this.snackBar.open(error.error.message, "", {
                //         duration: 2000,
                //     });
                // })

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
    getAreaData(val) {
        var formatJson = {};
        var finalData = [];
        for (let i = 0; i < val.length; i++) {
            formatJson = {
                "code": val[i].areaCode,
                "area": val[i].formattedAddress,
                "lt": val[i].latitude,
                "lg": val[i].longitude,
                "id": val[i]._id
            }
            finalData.push(formatJson);
            formatJson = {};
        }
        return finalData;
    }

    onForgetPassword() {
        this.router.navigate(['/signup']);
    }
}
