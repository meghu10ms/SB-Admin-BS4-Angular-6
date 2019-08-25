import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [routerTransition()]
})
export class CommentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'ph', 'comment'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public comments = [];
  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
export interface PeriodicElement {
  name: string;
  email: string;
  ph: number;
  comment: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen',email: 'pavankumar@gmail.com' , ph: 9899067878, comment: 'Comment1 Comment1 Comment1 Comment1 ' },
  { name: 'Helium', email: 'sureshkumar@gmail.com' , ph: 9998767878, comment: 'Comment2' },
  { name: 'Lithium', email: 'Ajay@gmail.com' , ph: 6698767878, comment: 'Comment3' },
  { name: 'Beryllium', email: 'shashi@gmail.com' , ph: 5698767878, comment: 'Comment4' },
  { name: 'Boron', email: 'mohan@gmail.com' , ph: 9890067878, comment: 'Comment10' },
  { name: 'Carbon',email: 'guru@gmail.com' , ph: 9898767823, comment: 'Comment17' },
  { name: 'Nitrogen',email: 'gouri@gmail.com' , ph: 9845267878, comment: 'Comment31' },
  { name: 'Oxygen', email: 'manu@gmail.com' , ph: 9198767878, comment: 'Comment51' },
  { name: 'Fluorine', email: 'john@gmail.com' , ph: 9098767878, comment: 'Comment31' },
  { name: 'Neon', email: 'aravind@gmail.com' , ph: 7798767878, comment: 'Comment17' },
  { name: 'Sodium',email: 'pallavi@gmail.com' , ph: 6698767878, comment: 'Comment demo' },
  { name: 'Magnesium', email: 'ali@gmail.com' , ph: 5598767878, comment: 'Comment1demo' },
  { name: 'Aluminum',email: 'akram@gmail.com' , ph: 6598767878, comment: 'Comment1 test' },
  { name: 'Silicon', email: 'shahid@gmail.com' , ph: 7898767878, comment: 'Comment1 valid' },
  { name: 'Phosphorus', email: 'sonu@gmail.com' , ph: 7898767878, comment: 'Comment test1' },
  { name: 'Sulfur', email: 'gitar@gmail.com' , ph: 9098767878, comment: 'Comment change' },
  { name: 'Chlorine', email: 'tarun@gmail.com' , ph: 1198767878, comment: 'Comment merge' },
  { name: 'Argon', email: 'stk@gmail.com' , ph: 2298767878, comment: 'Comment movie' },
  { name: 'Potassium', email: 'c12mnj@gmail.com' , ph: 3498767878, comment: 'Comment demo demo' },
  { name: 'Calcium', email: 'aa23aa@gmail.com' , ph: 5298767878, comment: 'Comment simple' },
];
