import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    private chart: AmChart;
    private chart1: AmChart;

    constructor(private route: Router, private AmCharts: AmChartsService) {
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

    ngOnInit() {
        
        var chart = this.AmCharts.makeChart( "chartdiv", {
            "hideCredits":"true",
            "type": "pie",
            "theme": "none",
            "titles": [{
                "text": "Demo Chart-1"
              }],
            "dataProvider": [ {
              "country": "Lithuania",
              "litres": 501.9
            }, {
              "country": "Czech Republic",
              "litres": 301.9
            }, {
              "country": "Ireland",
              "litres": 201.1
            }, {
              "country": "Germany",
              "litres": 165.8
            }, {
              "country": "Australia",
              "litres": 139.9
            }, {
              "country": "Austria",
              "litres": 128.3
            }, {
              "country": "UK",
              "litres": 99
            }, {
              "country": "Belgium",
              "litres": 60
            }, {
              "country": "The Netherlands",
              "litres": 50
            } ],
            "valueField": "litres",
            "titleField": "country",
             "balloon":{
             "fixedPosition":true
            },
            "export": {
              "enabled": true
            }
          } );

          var chart1 = this.AmCharts.makeChart( "chartdiv1", {
            "hideCredits":"true",
            "type": "pie",
            "theme": "none",
            "titles": [{
                "text": "Demo Chart-2"
              }],
            "dataProvider": [ {
              "country": "Lithuania",
              "litres": 501.9
            }, {
              "country": "Czech Republic",
              "litres": 301.9
            }, {
              "country": "Ireland",
              "litres": 201.1
            }, {
              "country": "Germany",
              "litres": 165.8
            }, {
              "country": "Australia",
              "litres": 139.9
            }, {
              "country": "Austria",
              "litres": 128.3
            }, {
              "country": "UK",
              "litres": 99
            }, {
              "country": "Belgium",
              "litres": 60
            }, {
              "country": "The Netherlands",
              "litres": 50
            } ],
            "valueField": "litres",
            "titleField": "country",
             "balloon":{
             "fixedPosition":true
            },
            "export": {
              "enabled": true
            }
          } );
    }
    ngOnDestroy() {
        if (this.chart) {
            this.AmCharts.destroyChart(this.chart);
        }
    }

    ViewComment(value) {
        if (value == "New Comments!") {
            this.route.navigate(['/comments']);
        } else if (value == "New Supplier!") {
            this.route.navigate(['/supplier']);
        } else if (value == "New Orders!") {
            this.route.navigate(['/forms']);
        } else if (value == "New Vendors!") {
            this.route.navigate(['/charts']);
        }
    }


}
