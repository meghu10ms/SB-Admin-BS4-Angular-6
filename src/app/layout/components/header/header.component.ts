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
            // if (this.cds.tokenLogin !== "") {
            //     this.cds.getCurentAdminDetails(this.cds.tokenLogin).subscribe(response => {
            //         var val = JSON.stringify(response);
            //         this.cds.currentAdminDetail = JSON.parse(val);
            //         var selectedAdmin = this.cds.currentAdminDetail.name;
            //         this.profileName = selectedAdmin.title + " " + selectedAdmin.firstName + " " + selectedAdmin.lastName;
            //         this.pushRightClass = 'push-right';
            //     }, error => {
            //         this.snackBar.open(error.error.message, "", {
            //             duration: 2000,
            //         });
            //     })
            // }
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
            height: '45%',
            position: { right: "0px", top: "70px" },
            data: { data1: this.cds.currentAdminDetail }
        })
        dialogRef.afterClosed().subscribe(result => {
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
        private fb: FormBuilder) { }

    ngOnInit() {
        this.viewProfile = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
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
        })
    }

}

