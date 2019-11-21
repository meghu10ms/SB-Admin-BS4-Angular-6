import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
export interface DialogData {
    data1: any;
    ind: any;
}

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    displayedColumns: string[] = ['firstname', 'lastname', 'email', 'ph', 'region', 'actions'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    public comments = [];
    constructor(public dialog: MatDialog, private snackBar: MatSnackBar,private route: Router) { }

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
    Customer(val) {
        /* const dialogRef = this.dialog.open(AddUser, {
          width: '95%',
          height: '80%',
          data: { ind:"edit",data1: val }
        })
        dialogRef.afterClosed().subscribe(result => {
        }); */
        this.route.navigate(['/tables']);
    }
    display(val) {
        const dialogRef = this.dialog.open(AddUser, {
            width: '95%',
            height: '80%',
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
    region: string;
    address: string;
    city: string;
    dob: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
    { firstname: 'Hydrogen', lastname: 'Hydrogen', email: 'pavankumar@gmail.com', ph: 9899067878, region: 'Bommanahlli', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Helium', lastname: 'Helium', email: 'sureshkumar@gmail.com', ph: 9998767878, region: 'Banaswadi', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Lithium', lastname: 'Lithium', email: 'Ajay@gmail.com', ph: 6698767878, region: 'Yalahanka', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Beryllium', lastname: 'Beryllium', email: 'shashi@gmail.com', ph: 5698767878, region: 'Pinya', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Boron', lastname: 'Boron', email: 'mohan@gmail.com', ph: 9890067878, region: 'Kormangala', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Carbon', lastname: 'Carbon', email: 'guru@gmail.com', ph: 9898767823, region: 'Vijaynagar', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Nitrogen', lastname: 'Nitrogen', email: 'gouri@gmail.com', ph: 9845267878, region: 'Rajaji Nagar', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Oxygen', lastname: 'Oxygen', email: 'manu@gmail.com', ph: 9198767878, region: 'Mejestic', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Fluorine', lastname: 'Fluorine', email: 'john@gmail.com', ph: 9098767878, region: 'Madiwala', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Neon', lastname: 'Neon', email: 'aravind@gmail.com', ph: 7798767878, region: 'BTM', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Sodium', lastname: 'Sodium', email: 'pallavi@gmail.com', ph: 6698767878, region: 'Jaya nagar', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Magnesium', lastname: 'Magnesium', email: 'ali@gmail.com', ph: 5598767878, region: 'J P Nagar', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Aluminum', lastname: 'Aluminum', email: 'akram@gmail.com', ph: 6598767878, region: 'Kanakpur', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Silicon', lastname: 'Silicon', email: 'shahid@gmail.com', ph: 7898767878, region: 'Arakere', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Phosphorus', lastname: 'Phosphorus', email: 'sonu@gmail.com', ph: 7898767878, region: 'Electronic city', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Sulfur', lastname: 'Sulfur', email: 'gitar@gmail.com', ph: 9098767878, region: 'Singasandra', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Chlorine', lastname: 'Chlorine', email: 'tarun@gmail.com', ph: 1198767878, region: 'Manipal county', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Argon', lastname: 'Argon', email: 'stk@gmail.com', ph: 2298767878, region: 'DLF', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Potassium', lastname: 'Potassium', email: 'c12mnj@gmail.com', ph: 3498767878, region: 'Aksjaynagar', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
    { firstname: 'Calcium', lastname: 'Calcium', email: 'aa23aa@gmail.com', ph: 5298767878, region: 'Dommalur', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
];


@Component({
    templateUrl: 'add-user.html',
})
export class AddUser implements OnInit {
    newUserForm: FormGroup;
    fileFor: FormGroup;
    val: any;
    pftelpat = "^[6789]{1}[0-9]{9}$";

    //
    public imagePath;
    imgURL: any;
    public message: string;
    //

    constructor(
        public dialogRef: MatDialogRef<AddUser>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.createForm();
        this.fileForm();

        this.fileFor.disable()
        this.newUserForm.disable()

        this.bindDisplayValues(this.dialogRef.componentInstance.data.data1);


    }
    createForm() {
        this.newUserForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern(this.pftelpat)]],
            email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            address: ['', Validators.required],
            city: ['', Validators.required],
            region: ['', Validators.required],
            dob: ['', Validators.required],
            doj: ['', Validators.required],
            adhar: ['', Validators.required]
        })
    }
    fileForm() {
        this.fileFor = this.fb.group({
            profile: ['', Validators.required],
            document: ['', Validators.required],

        })
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }


    bindDisplayValues(val) {
        this.newUserForm.patchValue({
            firstname: val.firstname,
            lastname: val.lastname,
            email: val.email,
            phone: val.ph,
            address: val.address,
            city: val.city,
            region: val.region,
            dob: new Date()
        })
    }
}
