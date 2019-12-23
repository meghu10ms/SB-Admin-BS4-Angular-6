import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonServiceService } from '../../common-service.service';
import { ConfirmationDialogService } from '../components/confirmation-dialog/confirmation-dialog.service';
export interface DialogData {
  data1: any;
  ind: any;
  data: any;
}
@Component({
  selector: 'app-delivery-charges',
  templateUrl: './delivery-charges.component.html',
  styleUrls: ['./delivery-charges.component.scss'],
  animations: [routerTransition()]
})
export class DeliveryChargesComponent implements OnInit {
  public visible: any;
  public DeliveryCharges: any[];

  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cds: CommonServiceService,
    private cnfr: ConfirmationDialogService) { }

  ngOnInit() {
    if (this.cds.tokenLogin === undefined) {
      this.cds.tokenLogin = sessionStorage.getItem("authToken");
    }
    this.nextProcess();
  }

  nextProcess() {
    this.visible = true;
    this.cds.getAllDelCharges(this.cds.tokenLogin).subscribe(response => {
      this.visible = false;
      this.DeliveryCharges = this.getDelCharges(response["deliveryCharge"]);
    }, error => {
      this.visible = false;
      this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
        duration: 2000,
      });
    })
  }
  getDelCharges(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      formatJson = {
        "amount": val[i].amount ? val[i].amount : "",
        "rangeFrom": val[i].rangeFrom ? val[i].rangeFrom : "",
        "rangeTo": val[i].rangeTo ? val[i].rangeTo : "",
        "id": val[i]._id ? val[i]._id : "",
        "createDate": val[i].createdOn ? new Date(val[i].createdOn).toDateString() : "",
        "modifiedDate": val[i].modifiedOn ? new Date(val[i].modifiedOn).toDateString() : "",
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }

  editDelCharge(val) {
    const dialogRef = this.dialog.open(DeliveryCharge, {
      data: { ind: "edit", data1: val, data: [] }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.nextProcess();
    });
  }

  deleteDelCharge(val) {
    this.cnfr.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.cds.deleteDelCharges(val.id, this.cds.tokenLogin).subscribe(response => {
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
      })
      .catch(() => {
        console.log('User dismissed the')
      });
  }


  newDeliveryCharge() {
    const dialogRef = this.dialog.open(DeliveryCharge, {
      data: { ind: "create", data1: "", data: [] }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.nextProcess();
    });
  }

}


@Component({
  templateUrl: 'add-delcharge.html',
})
export class DeliveryCharge implements OnInit {
  newUserForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DeliveryCharge>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    private cds2: CommonServiceService) { }

  ngOnInit() {
    var data = this.dialogRef.componentInstance.data.data1;
    this.createForm();
    if (this.dialogRef.componentInstance.data.ind == 'edit') {
      this.bindDisplayValues(data);
    }
  }
  createForm() {
    this.newUserForm = this.fb.group({
      amount: ['', Validators.required],
      rangeFrom: ['', Validators.required],
      rangeTo: ['', Validators.required],
      id: ['']
    })
  }

  createDeliveryCharge() {
    if (this.newUserForm.valid) {
      var filledData = this.newUserForm.value;
      var createData = {
        "amount": filledData.amount,
        "rangeFrom": filledData.rangeFrom,
        "rangeTo": filledData.rangeTo,
      };
      if (this.dialogRef.componentInstance.data.ind == 'create') {

        this.cds2.postDelCharges(this.cds2.tokenLogin, createData).subscribe(response => {
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

        this.cds2.updateDelCharges(filledData.id, this.cds2.tokenLogin, createData).subscribe(response => {
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else
      return true;
  }
  numberOnlyWithDot(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    var value = event.currentTarget.value;
    if (charCode == 46) {
      let dupliDot = value.indexOf(".");
      if (dupliDot == -1 && value.length !== 0)
        return true;
      else
        return false;
    } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else
      return true;
  }

  CancelDeliveryCharge() {
    this.dialogRef.close({ action: "no" });
  }

  bindDisplayValues(val) {
    this.newUserForm.patchValue({
      amount: val.amount,
      rangeFrom: val.rangeFrom,
      rangeTo: val.rangeTo,
      id: val.id
    });
  }


}
