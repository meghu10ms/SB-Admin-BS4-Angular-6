import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../common-service.service';
export interface DialogData {
  data1: any;
  ind: any;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
  visible: any;
  dataSource: any;
  displayedColumns: string[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public comments = [];

  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router,
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
    this.cds.getAllCustomers(this.cds.tokenLogin).subscribe(response => {
      this.visible = false;
      var data = this.getTableData(response["customers"]);
      const ELEMENT_DATA = data;
      this.displayedColumns = ['firstname', 'lastname', 'ph', 'email', 'gender', 'actions'];
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
        "title": (val[i].name ? (val[i].name.title !== 'undefined' ? val[i].name.title : "") : ""),
        "firstname": (val[i].name ? (val[i].name.firstName !== 'undefined' ? val[i].name.firstName : "") : ""),
        "lastname": (val[i].name ? (val[i].name.lastName !== 'undefined' ? val[i].name.lastName : "") : ""),
        "email": val[i].email ? val[i].email : "",
        "ph": val[i].phoneNumber ? val[i].phoneNumber : "",
        "gender": val[i].gender ? val[i].gender : "",
        "profilePicture": val[i].profilePicture ? val[i].profilePicture : "../assets/images/avtar.png",
        "uid": val[i].uid ? val[i].uid : "",
        "isActive": val[i].isActive ? val[i].isActive : ""
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  orders(val) {
    /* const dialogRef = this.dialog.open(AddUser, {
      width: '95%',
      height: '80%',
      data: { ind:"edit",data1: val }
    })
    dialogRef.afterClosed().subscribe(result => {
    }); */
    this.route.navigate(['/forms']);
  }
  display(val) {
    const dialogRef = this.dialog.open(AddUser, {

      data: { ind: "display", data1: val }
    })
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
export interface PeriodicElement {
  firstname: string;
  lastname: string;
  email: string;
  ph: number;
  gender: string;
}


@Component({
  templateUrl: 'add-user.html',
})
export class AddUser implements OnInit {
  newUserForm: FormGroup;
  val: any;
  public imagePath: any;
  public isActive: any;
  //

  constructor(
    public dialogRef: MatDialogRef<AddUser>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.bindDisplayValues(this.dialogRef.componentInstance.data.data1);


  }
  createForm() {
    this.newUserForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      phone: [''],
      email: [''],
      gender: ['']
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  CloseCustomer() {
    this.dialogRef.close();
  }

  bindDisplayValues(val) {
    this.imagePath = val.profilePicture;
    this.isActive = val.isActive;
    this.newUserForm.patchValue({
      firstname: val.firstname,
      lastname: val.lastname,
      email: val.email,
      phone: val.ph,
      gender: val.gender
    })
  }
}
