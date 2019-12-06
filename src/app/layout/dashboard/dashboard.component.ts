import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { CommonServiceService } from '../../common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
   
    private chart: AmChart;
    private chart1: AmChart;
    visible:any;

    constructor(private route: Router, 
      private AmCharts: AmChartsService,
      private cds: CommonServiceService,
      private snackBar: MatSnackBar,) {
       
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

    ngOnInit() {
      this.visible = true;
      this.cds.getAllAraeDetails(this.cds.tokenLogin).subscribe(response => {
        this.visible = false;
        this.cds.areaData = this.getAreaData(response["areas"]);
    }, error => {
        this.visible = false;
        this.snackBar.open(error.error.message, "", {
            duration: 2000,
        });
    })
        
        var chart = this.AmCharts.makeChart( "chartdiv", {
            "hideCredits":"true",
            "type": "serial",
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
