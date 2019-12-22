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

      this.DispenserCollection = this.getDispensers(response["dispensers"]);
    }, error => {
      this.visible = false;
      this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
        duration: 2000,
      });
    })
  }
  getDispensers(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      let medi = [], mediFile = val[i].medias, mediObj = {};
      for (let k = 0; k < mediFile.length; k++) {
        mediObj = {
          "id": mediFile[k],
          "path": this.cds.getFilePath(mediFile[k])
        }
        medi.push(mediObj);
        mediObj = {};
      }
      formatJson = {
        "name": val[i].name ? val[i].name : "",
        "description": val[i].description ? val[i].description : "",
        "code": val[i].code ? val[i].code : "",
        "id": val[i]._id ? val[i]._id : "",
        "price": val[i].price ? val[i].price : "",
        "cost": val[i].cost ? val[i].cost : "",
        "capacity": val[i].capacity ? val[i].capacity : "",
        "isActive": val[i].isActive ? true : false,
        "medias": medi ? medi : []
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }

  newDispenser() {
    const dialogRef = this.dialog.open(AddDispenser, {
      data: { ind: "create", data1: "", data: [] }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.nextProcess();
    });
  }

  editDispenser(val) {
    const dialogRef = this.dialog.open(AddDispenser, {
      data: { ind: "edit", data1: val, data: [] }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.nextProcess();
    });
  }

  deleteDispenser(val) {
    this.cds.deleteDispenser(val.id, this.cds.tokenLogin).subscribe(response => {
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
  templateUrl: 'add-dispenser.html',
})
export class AddDispenser implements OnInit {
  newUserForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddDispenser>,
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

  CancelDispenser() {
    this.dialogRef.close({ action: "no" });
  }
  createForm() {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      cost: ['', Validators.required],
      capacity: ['', Validators.required],
      isActive: ['', Validators.required],
      id: ['']
    })
  }

  createDispenser() {
    if (this.newUserForm.valid) {
      var filledData = this.newUserForm.value;
      var createData = {
        "name": filledData.name,
        "code": filledData.code,
        "description": filledData.description,
        "price": filledData.price,
        "cost": filledData.cost,
        "capacity": filledData.capacity,
        "isActive": filledData.isActive
      };
      if (this.dialogRef.componentInstance.data.ind == 'create') {

        this.cds2.postDispenser(this.cds2.tokenLogin, createData).subscribe(response => {
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

        this.cds2.updateDispenser(filledData.id, this.cds2.tokenLogin, createData).subscribe(response => {
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

  codeValidation(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    var value = event.currentTarget.value;
    var valLength = value.length;

    if (valLength < 4) {
      if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
        return true;
      } else
        return false;
    } else {
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      } else
        return true;
    }
  }

  upperCaseValue(event) {
    event.target.value = event.target.value.toUpperCase();
  }

  bindDisplayValues(val) {
    this.newUserForm.patchValue({
      name: val.name,
      code: val.code,
      description: val.description,
      price: val.price,
      cost: val.cost,
      capacity: val.capacity,
      isActive: val.isActive,
      id: val.id
    });
  }

}

