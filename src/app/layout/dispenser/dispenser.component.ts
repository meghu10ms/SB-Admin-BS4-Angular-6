import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonServiceService } from '../../common-service.service';
export interface DialogData {
  data1: any;
  ind: any;
  data: any;
}
@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss'],
  animations: [routerTransition()]
})
export class DispenserComponent implements OnInit {
  public visible: any;
  public DispenserCollection: any[];
  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cds: CommonServiceService) { }

  ngOnInit() {
    if (this.cds.tokenLogin === undefined) {
      this.cds.tokenLogin = sessionStorage.getItem("authToken");
    }
    this.nextProcess();
  }

  nextProcess() {
    this.visible = true;
    this.cds.getAllDispenser(this.cds.tokenLogin).subscribe(response => {
      this.visible = false;
    
      //this.DispenserCollection = this.getDispensers(response["deliveryCharge"]);
    }, error => {
      this.visible = false;
      this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
        duration: 2000,
      });
    })
  }
  // getDispensers(val) {
  //   var formatJson = {};
  //   var finalData = [];
  //   for (let i = 0; i < val.length; i++) {
  //     formatJson = {
  //       "amount": val[i].amount ? val[i].amount : "",
  //       "rangeFrom": val[i].rangeFrom ? val[i].rangeFrom : "",
  //       "rangeTo": val[i].rangeTo ? val[i].rangeTo : "",
  //       "id": val[i]._id ? val[i]._id : "",
  //       "createDate": val[i].createdOn ? new Date(val[i].createdOn).toDateString() : "",
  //       "modifiedDate": val[i].modifiedOn ? new Date(val[i].modifiedOn).toDateString() : "",
  //     }
  //     finalData.push(formatJson);
  //     formatJson = {};
  //   }
  //   return finalData;
  // }

  newDispenser() {
    const dialogRef = this.dialog.open(AddDispenser, {
      data: { ind: "create", data1: "", data: [] }
    })
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}

@Component({
  templateUrl: 'add-dispenser.html',
})
export class AddDispenser implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddDispenser>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    private cds2: CommonServiceService) { }

  ngOnInit() {

  }
  createDispenser() {

  }
  CancelDispenser() {
    this.dialogRef.close({ action: "no" });
  }
}

