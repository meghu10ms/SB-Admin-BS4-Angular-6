import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    constructor(private route:Router) {
        this.sliders.push(
            {
                imagePath: 'assets/images/w2.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/w3.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/w2.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        
    }

    ngOnInit() {}

    ViewComment(value){
        if(value == "New Comments!"){
            this.route.navigate(['/comments']);
        }else if( value == "New Supplier!"){
            this.route.navigate(['/supplier']);
        }else if(value == "New Orders!"){
           
        }else if( value == "New Vendors!" ){
            this.route.navigate(['/charts']);
        }
    }
    
}
