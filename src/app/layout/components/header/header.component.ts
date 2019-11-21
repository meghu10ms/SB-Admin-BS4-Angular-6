import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonServiceService } from '../../../common-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface DialogData {
    data1: any;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    public profileName: any;
    constructor(public router: Router, public dialog: MatDialog, private cds: CommonServiceService, private snackBar: MatSnackBar) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        if (this.cds.tokenLogin === undefined) {
            localStorage.removeItem('isLoggedin');
            this.router.navigate(['/login']);
        } else {
            var selectedAdmin = this.cds.currentAdminDetail.name;
            this.profileName = selectedAdmin.title + " " + selectedAdmin.firstName + " " + selectedAdmin.lastName;
            this.pushRightClass = 'push-right';
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        this.cds.currentAdminDetail = undefined;
        this.cds.tokenLogin = undefined;
        this.router.navigate(['/login']);
    }

    onProfile() {
        const dialogRef = this.dialog.open(ViewProfile, {
            width: '60%',
            height: '85%',
            position: { right: "0px", top: "70px" },
            data: { data1: this.cds.currentAdminDetail }
        })
        dialogRef.afterClosed().subscribe(result => {
        });
    }
    onChangePassword() {
        const dialogRefChangePass = this.dialog.open(ChangePassword, {
            width: '25%',
            height: '60%',
            position: { right: "0px", top: "70px" },
            data: { data1: this.cds.currentAdminDetail }
        })
        dialogRefChangePass.afterClosed().subscribe(result => {
        });
    }

}


@Component({
    templateUrl: 'view-profile.html',
})
export class ViewProfile implements OnInit {
    val: any;
    viewProfile: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<ViewProfile>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private snackBar: MatSnackBar, ) { }

    ngOnInit() {
        this.viewProfile = this.fb.group({
            firstname: [''],
            lastname: [''],
            phone: [''],
            email: [''],
            accountNumber: [''],
            accountType: [''],
            bankName: [''],
            branchName: [''],
            holderName: [''],
            ifscCode: [''],
            taxNumber: ['']


        })
        //this.viewProfile.disable()
        this.bindDisplayValues(this.dialogRef.componentInstance.data.data1);
    }
    onOkClick(): void {
        this.dialogRef.close();
    }
    bindDisplayValues(val) {
        this.viewProfile.patchValue({
            firstname: val.name.firstName,
            lastname: val.name.lastName,
            email: val.email,
            phone: val.phoneNumber,
            // region: val.region,

            accountNumber: val.bankDetails.accountNumber,
            accountType: val.bankDetails.accountType,
            bankName: val.bankDetails.bankName,
            branchName: val.bankDetails.branchName,
            holderName: val.bankDetails.holderName,
            ifscCode: val.bankDetails.ifscCode,
            taxNumber: val.bankDetails.taxNumber
        })
    }

}



@Component({
    templateUrl: 'change-password.html',
})
export class ChangePassword implements OnInit {
    val: any;
    changePass: FormGroup;
    constructor(
        public dialogRefChangePass: MatDialogRef<ChangePassword>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private cds2: CommonServiceService) { }

    ngOnInit() {
        this.changePass = this.fb.group({
            id: [''],
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {
            validator: this.MustMatch('newPassword', 'confirmPassword')
        })

        this.changePass.patchValue({
            id: this.dialogRefChangePass.componentInstance.data.data1._id
        })
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
    onCPOkClick() {
        //this.dialogRefChangePass.close();
        if (this.changePass.invalid) {
            this.snackBar.open("Enter Valid Values", "", {
                duration: 2000,
            });
            return;
        }
        var data = {
            "currentPassword": this.changePass.value.oldPassword,
            "newPassword": this.changePass.value.newPassword
        }
        this.cds2.changePassword(this.cds2.tokenLogin, data).subscribe(response => {
            this.snackBar.open(response["message"], "", {
                duration: 2000,
            });
            this.dialogRefChangePass.close()
        }, error => {
            this.snackBar.open(error.error.error.message, "", {
                duration: 2000,
            });
        });
    }
    Close(){
        this.dialogRefChangePass.close();
    }

}