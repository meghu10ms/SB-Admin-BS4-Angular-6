import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public visible: any;
  constructor(public router: Router,
    private cds: CommonServiceService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.visible = true;
    this.cds.getCurentAdminDetails(this.cds.tokenLogin).subscribe(response => {
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

}
