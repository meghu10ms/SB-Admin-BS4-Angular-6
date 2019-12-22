import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonServiceService } from '../../common-service.service';
export interface DialogData {
  data1: any;
  ind: any;
}

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  animations: [routerTransition()]
})
export class AreaComponent implements OnInit {

  visible: any;
  dataSource: any;
  displayedColumns: string[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public comments = [];
  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cds: CommonServiceService) { }

  ngOnInit() {
    this.visible = true;
    this.getDeatails();
  }
  getDeatails() {
    if (this.cds.tokenLogin === undefined) {
      this.cds.tokenLogin = sessionStorage.getItem("authToken");
    }
    this.visible = true;
    this.cds.getAllAraeDetails(this.cds.tokenLogin).subscribe(response => {
      this.visible = false;
      var data = this.getTableData(response["areas"]);
      const ELEMENT_DATA = data;
      this.displayedColumns = ['code', 'area', 'lt', 'lg', 'actions'];
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.visible = false;
      var msg = error.error.message ? error.error.message : error.message
      this.snackBar.open(msg, "", {
        duration: 2000,
      });
    })
  }

  getTableData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      formatJson = {
        "code": val[i].areaCode ? val[i].areaCode : "",
        "area": val[i].formattedAddress ? val[i].formattedAddress : "",
        "lt": val[i].latitude ? val[i].latitude : "",
        "lg": val[i].longitude ? val[i].longitude : "",
        "id": val[i]._id ? val[i]._id : ""
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }

  add() {
    const dialogRef = this.dialog.open(AddArea, {
      width: '30%',
      height: '80%',
      data: { ind: "create", data1: "" }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.getDeatails();
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  edit(val) {
    const dialogRef = this.dialog.open(AddArea, {
      width: '30%',
      height: '80%',
      data: { ind: "edit", data1: val }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.getDeatails();
    });
  }
  display(val) {
    const dialogRef = this.dialog.open(AddArea, {
      width: '30%',
      height: '75%',
      data: { ind: "display", data1: val }
    })
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  remove(val) {
    this.cds.deleteAreaDetails(val.id, this.cds.tokenLogin).subscribe(response => {
      this.snackBar.open(response["message"], "", {
        duration: 2000,
      });
      this.getDeatails();
    }, error => {

      var msg = error.error.message ? error.error.message : error.message;
      this.snackBar.open(msg, "", {
        duration: 2000,
      });
    })

  }


}

export interface PeriodicElement {
  code: string;
  area: string;
  lt: string;
  lg: string;


}


@Component({
  templateUrl: 'add-area.html',
})
export class AddArea implements OnInit {
  newUserForm: FormGroup;
  val: any;
  // filevalid: any;
  // filevalid1: any;
  displayInd: any;

  //

  constructor(
    public dialogRef: MatDialogRef<AddArea>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder, private _snackBar: MatSnackBar,
    private cds1: CommonServiceService) { }

  ngOnInit() {
    this.displayInd = true;
    this.createForm();

    if (this.dialogRef.componentInstance.data.ind == 'display') {
      this.displayInd = false;
      this.newUserForm.disable()

      this.bindDisplayValues(this.dialogRef.componentInstance.data.data1);
    } else if (this.dialogRef.componentInstance.data.ind == 'edit') {
      this.bindDisplayValues(this.dialogRef.componentInstance.data.data1);
    } else if (this.dialogRef.componentInstance.data.ind == 'create') {

    }

  }
  createForm() {
    this.newUserForm = this.fb.group({
      code: ['', Validators.required],
      area: ['', Validators.required],
      lt: ['', Validators.required],
      lg: ['', Validators.required],
      id: ['']
    })
  }

  clearScreen(oEvent) {
    this.newUserForm.reset();
    // this.filevalid = false;
    // this.filevalid1 = false;
  }
  close() {
    this.dialogRef.close({ action: "no" });
  }
  createNewUser(oEvent) {
    if (this.newUserForm.valid) {
      var selectedValue = this.newUserForm.value;
      var bodyData = {
        "areaCode": selectedValue.code,
        "formattedAddress": selectedValue.area,
        "latitude": selectedValue.lt,
        "longitude": selectedValue.lg
      }

      if (this.dialogRef.componentInstance.data.ind == 'create') {
        this.cds1.postAreaDetails(bodyData, this.cds1.tokenLogin).subscribe(response => {
          this._snackBar.open(response["message"], "", {
            duration: 2000,
          });
          this.dialogRef.close({ action: "yes" });
        }, error => {
          var msg = error.error.message ? error.error.message : error.message;
          this._snackBar.open(msg, "", {
            duration: 2000,
          });
        })
      } else if (this.dialogRef.componentInstance.data.ind == 'edit') {
        this.cds1.updateAreaDetails(this.newUserForm.value.id, bodyData, this.cds1.tokenLogin).subscribe(response => {
          this._snackBar.open(response["message"], "", {
            duration: 2000,
          });
          this.dialogRef.close({ action: "yes" });
        }, error => {
          var msg = error.error.message ? error.error.message : error.message;
          this._snackBar.open(msg, "", {
            duration: 2000,
          });
        })
      }

    } else {
      for (let name in this.newUserForm.controls) {
        if (this.newUserForm.controls[name].value == '' || this.newUserForm.controls[name].value == null) {
          this.newUserForm.controls[name].markAsTouched();
          this._snackBar.open("Please Enter All values", "", {
            duration: 2000,
          });
        }
        else
          this.newUserForm.controls[name].setErrors(null);
      }
    }
  }

  codeValidation(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    var value = event.currentTarget.value;
    var valLength = value.length;

    if (valLength < 3) {
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


  bindDisplayValues(val) {
    this.newUserForm.patchValue({
      code: val.code,
      area: val.area,
      lt: val.lt,
      lg: val.lg,
      id: val.id
    })
  }
}

