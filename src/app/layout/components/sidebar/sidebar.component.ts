import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonServiceService } from '../../../common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    isAdmin: boolean;
    profileName:any;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(public router: Router, private cds: CommonServiceService, private snackBar: MatSnackBar) {
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
            this.isActive = false;
            this.collapsed = true;
            this.collapsedEvent.emit(this.collapsed);
            this.showMenu = '';

            var selectedAdmin = this.cds.currentAdminDetail;
            this.isAdmin = selectedAdmin.isSuperAdmin;

            var selectedAd = this.cds.currentAdminDetail.name;
            this.profileName = selectedAd.title + " " + selectedAd.firstName + " " + selectedAd.lastName;
            this.pushRightClass = 'push-right';
        }

    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
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
        debugger;
    }

}
