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
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
  animations: [routerTransition()]
})
export class TaxComponent implements OnInit {
  public visible: any;
  public TaxCollections: any[];
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
    this.cds.getAllTax(this.cds.tokenLogin).subscribe(response => {
      this.visible = false;
      this.TaxCollections = this.getTaxes(response["Taxes"]);
    }, error => {
      this.visible = false;
      this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
        duration: 2000,
      });
    })
  }
  getTaxes(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      formatJson = {
        "type": val[i].type ? val[i].type : "",
        "name": val[i].name ? val[i].name : "",
        "percentage": val[i].percentage ? val[i].percentage : "",
        "authority": val[i].authority ? val[i].authority : "",
        "isActive": val[i].isActive,
        "id": val[i]._id ? val[i]._id : "",
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }

  newTax() {
    const dialogRef = this.dialog.open(AddTax, {
      data: { ind: "create", data1: "", data: [] }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.nextProcess();
    });
  }
  editTax(val) {
    const dialogRef = this.dialog.open(AddTax, {
      data: { ind: "edit", data1: val, data: [] }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.nextProcess();
    });
  }



  deleteTax(val) {
    this.cnfr.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.cds.deleteTax(val.id, this.cds.tokenLogin).subscribe(response => {
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
        console.log('User dismissed the');
      });
  }
}

@Component({
  templateUrl: 'add-tax.html',
})
export class AddTax implements OnInit {
  newUserForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddTax>,
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
      name: ['', Validators.required],
      percentage: ['', Validators.required],
      type: ['', Validators.required],
      authority: ['', Validators.required],
      isActive: ['', Validators.required],
      id: ['']
    })
  }

  createTax() {
    if (this.newUserForm.valid) {
      var filledData = this.newUserForm.value;
      var createData = {
        "name": filledData.name,
        "percentage": filledData.percentage,
        "type": filledData.type,
        "authority": filledData.authority,
        "isActive": filledData.isActive
      };
      if (this.dialogRef.componentInstance.data.ind == 'create') {

        this.cds2.postTax(this.cds2.tokenLogin, createData).subscribe(response => {
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

        this.cds2.updateTax(filledData.id, this.cds2.tokenLogin, createData).subscribe(response => {
          this.snackBar.open(response["message"], "", {
            duration: 2000,
          });
          this.dialogRef.close({ action: "yes" });
        }, error => {
          this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
            duration: 2000,
          });
        });

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

  CancelPage() {
    this.dialogRef.close({ action: "no" });
  }

  bindDisplayValues(val) {
    this.newUserForm.patchValue({
      name: val.name,
      percentage: val.percentage,
      type: val.type,
      authority: val.authority,
      isActive: val.isActive,
      id: val.id
    });
  }


}
