import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface DialogData {
  Comment: any
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
  animations: [routerTransition()]
})
export class SupplierComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'ph', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public comments = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  add() {

    const dialogRef = this.dialog.open(AddUser, {
      width: '80%',
      height: '80%',
      data: { data1: "Sorry..! Login failed" }
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
  edit(val){
    const dialogRef = this.dialog.open(AddUser, {
      width: '80%',
      height: '80%',
      data: { data1: "Sorry..! Login failed" }
    })
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
}
export interface PeriodicElement {
  name: string;
  email: string;
  ph: number;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', email: 'pavankumar@gmail.com', ph: 9899067878},
  { name: 'Helium', email: 'sureshkumar@gmail.com', ph: 9998767878 },
  { name: 'Lithium', email: 'Ajay@gmail.com', ph: 6698767878 },
  { name: 'Beryllium', email: 'shashi@gmail.com', ph: 5698767878 },
  { name: 'Boron', email: 'mohan@gmail.com', ph: 9890067878 },
  { name: 'Carbon', email: 'guru@gmail.com', ph: 9898767823 },
  { name: 'Nitrogen', email: 'gouri@gmail.com', ph: 9845267878 },
  { name: 'Oxygen', email: 'manu@gmail.com', ph: 9198767878 },
  { name: 'Fluorine', email: 'john@gmail.com', ph: 9098767878 },
  { name: 'Neon', email: 'aravind@gmail.com', ph: 7798767878},
  { name: 'Sodium', email: 'pallavi@gmail.com', ph: 6698767878 },
  { name: 'Magnesium', email: 'ali@gmail.com', ph: 5598767878 },
  { name: 'Aluminum', email: 'akram@gmail.com', ph: 6598767878 },
  { name: 'Silicon', email: 'shahid@gmail.com', ph: 7898767878 },
  { name: 'Phosphorus', email: 'sonu@gmail.com', ph: 7898767878 },
  { name: 'Sulfur', email: 'gitar@gmail.com', ph: 9098767878 },
  { name: 'Chlorine', email: 'tarun@gmail.com', ph: 1198767878 },
  { name: 'Argon', email: 'stk@gmail.com', ph: 2298767878 },
  { name: 'Potassium', email: 'c12mnj@gmail.com', ph: 3498767878 },
  { name: 'Calcium', email: 'aa23aa@gmail.com', ph: 5298767878 },
];



@Component({
  templateUrl: 'add-user.html',
})
export class AddUser implements OnInit {

  val: any;
  constructor(
    public dialogRef: MatDialogRef<AddUser>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
