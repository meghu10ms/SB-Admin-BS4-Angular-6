import { Component, OnInit,Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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

    constructor(public router: Router,public dialog: MatDialog) {

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
        this.pushRightClass = 'push-right';
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
        //this.router.navigate(['']);
    }

    onProfile() {
        debugger;
         const dialogRef = this.dialog.open(ViewProfile, {
            width: '60%',
            height: '60%',
            position:{right:"0px",top:"70px"},
            data: {data1: "value" }
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
    constructor(
        public dialogRef: MatDialogRef<ViewProfile>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    ngOnInit() {
       
    }
    onOkClick(): void {
        this.dialogRef.close();
      }
    
}

