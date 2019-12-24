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
  selector: 'app-delivery-commission',
  templateUrl: './delivery-commission.component.html',
  styleUrls: ['./delivery-commission.component.scss'],
  animations: [routerTransition()]
})
export class DeliveryCommissionComponent implements OnInit {
  public visible: any;
  public DeliveryCommission: any[];
  ComNoCan = [];
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
    this.ComNoCan.push("1"); 

  }

  newDeliveryCom() {
    const dialogRef = this.dialog.open(DeliveryCom, {
      data: { ind: "create", data1: "", data: [] }
    })
    dialogRef.afterClosed().subscribe(result => {

    });
  }

}


@Component({
  templateUrl: 'add-delcom.html',
})
export class DeliveryCom implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeliveryCom>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    private cds2: CommonServiceService) { }

  ngOnInit() {

  }

  createDeliveryCom() {

  }

  CancelDeliveryCom() {
    this.dialogRef.close({ action: "no" });
  }


}