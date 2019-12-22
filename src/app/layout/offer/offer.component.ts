import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonServiceService } from '../../common-service.service';
import { DatePipe } from '@angular/common';
export interface DialogData {
  data1: any;
  ind: any;
  data: any;
}

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  animations: [routerTransition()]
})
export class OfferComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cds: CommonServiceService) { }
  visible: any;
  OfferCollection: any[];
  customerCollection: any[];

  ngOnInit() {
    if (this.cds.tokenLogin === undefined) {
      this.cds.tokenLogin = sessionStorage.getItem("authToken");
    }
    this.nextProcess();
  }
  nextProcess() {
    this.visible = true;
    this.cds.getAllOffer(this.cds.tokenLogin).subscribe(response => {
      //this.visible = false;
      this.OfferCollection = this.getOffers(response["offers"]);
      this.cds.getAllCustomers(this.cds.tokenLogin).subscribe(response => {
        this.visible = false;
        this.customerCollection = this.getTableData(response["customers"]);
      }, error => {
        this.visible = false;
        var msg = error.error.message ? error.error.message : error.message
        this.snackBar.open(msg, "", {
          duration: 2000,
        });
      })
    }, error => {
      this.visible = false;
      this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
        duration: 2000,
      });
    })
  }
  getOffers(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      formatJson = {
        "name": val[i].offername ? val[i].offername : "",
        "description": val[i].offerDescription ? val[i].offerDescription : "",
        "couponCode": val[i].couponCode ? val[i].couponCode : "",
        "type": val[i].offerType ? val[i].offerType : "",
        "limit": val[i].limit ? val[i].limit : "",
        "fromDate": val[i].validFrom ? new Date(val[i].validFrom).toDateString() : "",
        "validDuration": val[i].validDuration ? val[i].validDuration : "",
        "percentage": val[i].percentage ? val[i].percentage : "",
        "amount": val[i].amount ? val[i].amount : "",
        "customers": val[i].customers ? val[i].customers : [],
        "offerId": val[i]._id ? val[i]._id : ""
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }

  getTableData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      if (val[i].isActive) {
        formatJson = {
          "firstname": (val[i].name ? (val[i].name.firstName !== 'undefined' ? val[i].name.firstName : "") : ""),
          "lastname": (val[i].name ? (val[i].name.lastName !== 'undefined' ? val[i].name.lastName : "") : ""),
          "email": val[i].email ? val[i].email : "",
          "ph": val[i].phoneNumber ? val[i].phoneNumber : "",
          "uid": val[i].uid ? val[i].uid : "",
          "custId": val[i]._id ? val[i]._id : "",
        }
        finalData.push(formatJson);
        formatJson = {};
      }
    }
    return finalData;
  }

  newOffer() {
    const dialogRef = this.dialog.open(ViewOffer, {

      data: { ind: "create", data1: "", data: this.customerCollection }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.nextProcess();
    });
  }

  editOffers(val) {
    const dialogRef = this.dialog.open(ViewOffer, {

      data: { ind: "edit", data1: val, data: this.customerCollection }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.nextProcess();
    });
  }

  deleteOffers(val) {
    this.cds.deleteOffer(val.offerId, this.cds.tokenLogin).subscribe(response => {
      this.snackBar.open((response ? response["message"] : ""), "", {
        duration: 2000,
      });
      this.nextProcess();
    }, error => {
      this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
        duration: 2000,
      });
    });
  }

}


@Component({
  templateUrl: 'view-offer.html',
})
export class ViewOffer implements OnInit {
  newUserForm: FormGroup;
  offerType: any[];
  customersList: any[];



  constructor(
    public dialogRef: MatDialogRef<ViewOffer>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    private cds2: CommonServiceService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.customersList = this.dialogRef.componentInstance.data.data;
    this.offerType = [{ "type": "PRTG" }, { "type": "AMT" }];
    var data = this.dialogRef.componentInstance.data.data1;
    this.createForm();
    if (this.dialogRef.componentInstance.data.ind == 'edit') {
      this.bindDisplayValues(data);
    } else {

    }
  }
  createForm() {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      couponCode: ['', Validators.required],
      percentage: ['', Validators.required],
      type: ['', Validators.required],
      limit: ['', Validators.required],
      amount: ['', Validators.required],
      customer: [''],
      validDuration: ['', Validators.required],
      fromDate: ['', Validators.required],
      offerId: [''],
    })
  }

  CancelPage() {
    this.dialogRef.close({ action: "no" });
  }

  createOffer() {
    if (this.newUserForm.valid) {
      var filledData = this.newUserForm.value;
      var createData = {
        "offername": filledData.name,
        "offerDescription": filledData.description,
        "couponCode": filledData.couponCode,
        "percentage": filledData.percentage,
        "amount": filledData.amount,
        "validDuration": filledData.validDuration,
        "offerType": filledData.type,
        "limit": filledData.limit,
        "validFrom": filledData.fromDate,//this.datePipe.transform(filledData.fromDate, "yyyy-MM-dd"),
        "customers": filledData.customer ? filledData.customer : []
      };
      if (this.dialogRef.componentInstance.data.ind == 'create') {

        this.cds2.postOffer(this.cds2.tokenLogin, createData).subscribe(response => {
          this.snackBar.open(response["message"], "", {
            duration: 2000,
          });
          this.dialogRef.close({ action: "yes" });
        }, error => {
          this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
            duration: 2000,
          });
        });
      } else if (this.dialogRef.componentInstance.data.ind == 'edit') {

        this.cds2.updateOffer(filledData.offerId, this.cds2.tokenLogin, createData).subscribe(response => {
          this.snackBar.open(response["message"], "", {
            duration: 2000,
          });
          this.dialogRef.close({ action: "yes" });
        }, error => {
          this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
            duration: 2000,
          });
        });
      }

    } else {
      for (let name in this.newUserForm.controls) {
        if (this.newUserForm.controls[name].value == '' || this.newUserForm.controls[name].value == null) {
          this.newUserForm.controls[name].markAsTouched();
          this.snackBar.open("Please Enter All values", "", {
            duration: 2000,
          });
        }
        else
          this.newUserForm.controls[name].setErrors(null);
      }

    }
  }
  bindDisplayValues(val) {
    this.newUserForm.patchValue({
      name: val.name,
      description: val.description,
      couponCode: val.couponCode,
      percentage: val.percentage,
      type: val.type,
      limit: val.limit,
      offer: val.offer,
      amount: val.amount,
      customer: val.customers,
      validDuration: val.amount,
      fromDate: new Date(val.fromDate),
      offerId: val.offerId
    });
  }
}