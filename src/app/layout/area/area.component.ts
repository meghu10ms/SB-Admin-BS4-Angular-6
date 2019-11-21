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

  add() {

    const dialogRef = this.dialog.open(AddArea, {
      width: '30%',
      height: '80%',
      data: { ind: "create", data1: "" }
    })
    dialogRef.afterClosed().subscribe(result => {
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

// const ELEMENT_DATA: PeriodicElement[] = [
//   { code: 'A0001', area: 'Bommanahlli', lt: '100000.900', lg: '100000.900' },
//   { code: 'A0002', area: 'Vijaynagar', lt: '100000.900', lg: '100000.900' },
//   { code: 'A0003', area: 'Rajajinagar', lt: '100000.900', lg: '100000.900' },
//   { code: 'A0004', area: 'HRBR Layout', lt: '100000.900', lg: '100000.900' },
//   { code: 'A0005', area: 'Kalyannagar', lt: '100000.900', lg: '100000.900' },
//   { code: 'A0006', area: 'Bapujinagar', lt: '100000.900', lg: '100000.900' },
//   { code: 'A0007', area: 'Shivajinagar', lt: '100000.900', lg: '100000.900' },
//   { code: 'A0008', area: 'Arakere', lt: '100000.900', lg: '100000.900' },
// ];



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
        this.cds1.postAreaDetails(bodyData).subscribe(response => {
          this._snackBar.open(response["message"], "", {
            duration: 2000,
          });
          this.dialogRef.close();
        }, error => {
          var msg = error.error.message ? error.error.message : error.message;
          this._snackBar.open(msg, "", {
            duration: 2000,
          });
        })
      } else if (this.dialogRef.componentInstance.data.ind == 'edit') {
        // var bodyData1 = {

        //   "formattedAddress": selectedValue.area,
        //   "latitude": selectedValue.lt,
        //   "longitude": selectedValue.lg
        // }
        this.cds1.updateAreaDetails(this.newUserForm.value.id, bodyData, this.cds1.tokenLogin).subscribe(response => {
          this._snackBar.open(response["message"], "", {
            duration: 2000,
          });
          this.dialogRef.close();
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

