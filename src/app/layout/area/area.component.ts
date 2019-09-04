import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  displayedColumns: string[] = ['code', 'area', 'lt', 'lg', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public comments = [];
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  add() {

    const dialogRef = this.dialog.open(AddArea, {
      width: '30%',
      height: '80%',
      data: { ind: "create", data1: "" }
    })
    dialogRef.afterClosed().subscribe(result => {
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
    this.snackBar.open("Not Yet Implemented", "", {
      duration: 2000,
    });
  }


}

export interface PeriodicElement {
  code: string;
  area: string;
  lt: string;
  lg: string;
 

}

const ELEMENT_DATA: PeriodicElement[] = [
  { code: 'A0001', area: 'Bommanahlli', lt: '100000.900', lg: '100000.900' },
  { code: 'A0002', area: 'Vijaynagar', lt: '100000.900', lg: '100000.900' },
  { code: 'A0003', area: 'Rajajinagar', lt: '100000.900', lg: '100000.900' },
  { code: 'A0004', area: 'HRBR Layout', lt: '100000.900', lg: '100000.900' },
  { code: 'A0005', area: 'Kalyannagar', lt: '100000.900', lg: '100000.900' },
  { code: 'A0006', area: 'Bapujinagar', lt: '100000.900', lg: '100000.900' },
  { code: 'A0007', area: 'Shivajinagar', lt: '100000.900', lg: '100000.900' },
  { code: 'A0008', area: 'Arakere', lt: '100000.900', lg: '100000.900' },
];



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
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    debugger;
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
      lg: ['', Validators.required]
    })
  }
 
  clearScreen(oEvent) {
    this.newUserForm.reset();
    // this.filevalid = false;
    // this.filevalid1 = false;
  }
  createNewUser(oEvent) {
    debugger;
    if (this.newUserForm.valid) {
      debugger;
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
    debugger;
    this.newUserForm.patchValue({
      code: val.code,
      area: val.area,
      lt: val.lt,
      lg: val.lg,
     
    })
  }
}

