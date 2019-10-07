import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;

    constructor(private cds: CommonServiceService,
        private snackBar: MatSnackBar,
        public router: Router) { }

    ngOnInit() {
        
    }
  
    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
