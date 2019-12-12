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
  public alerts: Array<any> = [];
  public sliders: Array<any> = [];
  private chart: AmChart;
  private chart1: AmChart;
  visible: any;
  data: any;

  constructor(private route: Router,
    private AmCharts: AmChartsService,
    private cds: CommonServiceService,
    private snackBar: MatSnackBar, ) {
    this.alerts.push(
      {
        id: 1,
        type: 'success',
        message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptates est animi quibusdam praesentium quam, et perspiciatis,
            consectetur velit culpa molestias dignissimos
            voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
      },
      {
        id: 2,
        type: 'warning',
        message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptates est animi quibusdam praesentium quam, et perspiciatis,
            consectetur velit culpa molestias dignissimos
            voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
      }
    );
  }

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  ngOnInit() {
    this.data = [{
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
    }];
    var chart1 = this.AmCharts.makeChart("chartdiv1", {
      "hideCredits": "true",
      "type": "pie",
      "theme": "light",
      "titles": [{
        "text": "Demo Chart-1"
      }],
      "dataProvider": this.data,
      "valueField": "litres",
      "titleField": "country",
      "balloon": {
        "fixedPosition": true
      },
      "export": {
        "enabled": true
      }
    });
    var chart2 = this.AmCharts.makeChart("chartdiv2", {
      "hideCredits": "true",
      "type": "pie",
      "theme": "none",
      "titles": [{
        "text": "Demo Chart-2"
      }],
      "dataProvider": this.data,
      "valueField": "litres",
      "titleField": "country",
      "balloon": {
        "fixedPosition": true
      },
      "export": {
        "enabled": true
      }
    });
    var chart3 = this.AmCharts.makeChart("chartdiv3", {
      "hideCredits": "true",
      "type": "pie",
      "theme": "none",
      "titles": [{
        "text": "Demo Chart-3"
      }],
      "dataProvider": this.data,
      "valueField": "litres",
      "titleField": "country",
      "balloon": {
        "fixedPosition": true
      },
      "export": {
        "enabled": true
      }
    });
    var chart4 = this.AmCharts.makeChart("chartdiv4", {
      "hideCredits": "true",
      "type": "pie",
      "theme": "none",
      "titles": [{
        "text": "Demo Chart-4"
      }],
      "dataProvider": this.data,
      "valueField": "litres",
      "titleField": "country",
      "balloon": {
        "fixedPosition": true
      },
      "export": {
        "enabled": true
      }
    });
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
