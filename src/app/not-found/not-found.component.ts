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
  private visible: any;
  constructor(public router: Router,
    private cds: CommonServiceService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    
    this.visible = true;
    this.cds.getCurentAdminDetails(this.cds.tokenLogin).subscribe(response => {
      this.visible = false;
      var val = JSON.stringify(response);
      this.cds.currentAdminDetail = JSON.parse(val);
      this.router.navigate(['/dashboard']);
    }, error => {
      this.visible = false;
      this.snackBar.open(error.error.message, "", {
        duration: 2000,
      });
    })
  }

}
