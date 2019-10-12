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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [routerTransition()]
})
export class AdminComponent implements OnInit {
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
    this.cds.getAllAdminDetails(this.cds.tokenLogin).subscribe(response => {
      this.visible = false;
      var data = this.getTableData(response["admins"]);
      const ELEMENT_DATA = data;
      this.displayedColumns = ['firstname', 'lastname', 'email', 'ph', 'region', 'actions'];
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cds.getAllAraeDetails(this.cds.tokenLogin).subscribe(response => {

        this.cds.areaData = this.getAreaData(response["areas"]);

      }, error => {
        this.visible = false;
        this.snackBar.open(error.error.message, "", {
          duration: 2000,
        });
      })
    }, error => {
      this.visible = false;
      this.snackBar.open(error.error.message, "", {
        duration: 2000,
      });
    })

  }
  getTableData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      formatJson = {
        "title":val[i].name.title,
        "firstname": val[i].name.firstName,
        "lastname": val[i].name.lastName,
        "email": val[i].email,
        "ph": val[i].phoneNumber,
        "region": val[i].areaId.areaCode,
        "city": val[i].areaId.formattedAddress,
        "areaId":val[i].areaId._id,

        "accountNumber": val[i].bankDetails.accountNumber,
        "accountType": val[i].bankDetails.accountType,
        "bankName": val[i].bankDetails.bankName,
        "branchName": val[i].bankDetails.branchName,
        "holderName": val[i].bankDetails.holderName,
        "ifscCode": val[i].bankDetails.ifscCode,
        "taxNumber": val[i].bankDetails.taxNumber,

        "media": val[i].medias
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }
  getAreaData(val) {
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

    const dialogRef = this.dialog.open(AddUser, {
      width: '95%',
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
    const dialogRef = this.dialog.open(AddUser, {
      width: '95%',
      height: '80%',
      data: { ind: "edit", data1: val }
    })
    dialogRef.afterClosed().subscribe(result => {
    });
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

  remove(val) {
    this.snackBar.open("Not Yet Implemented", "", {
      duration: 2000,
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
// const ELEMENT_DATA: PeriodicElement[] = [
//   { firstname: 'Hydrogen', lastname: 'Hydrogen', email: 'pavankumar@gmail.com', ph: 9899067878, region: 'Bommanahlli', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Helium', lastname: 'Helium', email: 'sureshkumar@gmail.com', ph: 9998767878, region: 'Banaswadi', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Lithium', lastname: 'Lithium', email: 'Ajay@gmail.com', ph: 6698767878, region: 'Yalahanka', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Beryllium', lastname: 'Beryllium', email: 'shashi@gmail.com', ph: 5698767878, region: 'Pinya', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Boron', lastname: 'Boron', email: 'mohan@gmail.com', ph: 9890067878, region: 'Kormangala', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Carbon', lastname: 'Carbon', email: 'guru@gmail.com', ph: 9898767823, region: 'Vijaynagar', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Nitrogen', lastname: 'Nitrogen', email: 'gouri@gmail.com', ph: 9845267878, region: 'Rajaji Nagar', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Oxygen', lastname: 'Oxygen', email: 'manu@gmail.com', ph: 9198767878, region: 'Mejestic', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Fluorine', lastname: 'Fluorine', email: 'john@gmail.com', ph: 9098767878, region: 'Madiwala', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Neon', lastname: 'Neon', email: 'aravind@gmail.com', ph: 7798767878, region: 'BTM', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Sodium', lastname: 'Sodium', email: 'pallavi@gmail.com', ph: 6698767878, region: 'Jaya nagar', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Magnesium', lastname: 'Magnesium', email: 'ali@gmail.com', ph: 5598767878, region: 'J P Nagar', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Aluminum', lastname: 'Aluminum', email: 'akram@gmail.com', ph: 6598767878, region: 'Kanakpur', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Silicon', lastname: 'Silicon', email: 'shahid@gmail.com', ph: 7898767878, region: 'Arakere', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Phosphorus', lastname: 'Phosphorus', email: 'sonu@gmail.com', ph: 7898767878, region: 'Electronic city', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Sulfur', lastname: 'Sulfur', email: 'gitar@gmail.com', ph: 9098767878, region: 'Singasandra', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Chlorine', lastname: 'Chlorine', email: 'tarun@gmail.com', ph: 1198767878, region: 'Manipal county', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Argon', lastname: 'Argon', email: 'stk@gmail.com', ph: 2298767878, region: 'DLF', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Potassium', lastname: 'Potassium', email: 'c12mnj@gmail.com', ph: 3498767878, region: 'Aksjaynagar', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
//   { firstname: 'Calcium', lastname: 'Calcium', email: 'aa23aa@gmail.com', ph: 5298767878, region: 'Dommalur', address: 'Bangalore', city: 'Bangalore', dob: '20/05/2019' },
// ];



@Component({
  templateUrl: 'add-user.html',
})
export class AddUser implements OnInit {
  newUserForm: FormGroup;
  fileFor: FormGroup;
  val: any;
  pftelpat = "^[6789]{1}[0-9]{9}$";
  filevalid: any;
  filevalid1: any;
  displayInd: any;
  
  public imagePath;
  imgURL: any;
  imgURL1: any;
  public message: string;
  region: any[];
  titleCollection:any[];

  constructor(
    public dialogRef: MatDialogRef<AddUser>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cds2: CommonServiceService) { }

  ngOnInit() {
    this.region = this.cds2.areaData;
    var data = this.dialogRef.componentInstance.data.data1;
    debugger;
    this.titleCollection = [{"title":"Mr."},{"title":"Mrs."},{"title":"Miss."}];
    this.nextProcess();

    this.cds2.getMedia(this.cds2.tokenLogin, data.media[0]._id).subscribe(response => {
      this.imgURL = response["path"];
      this.cds2.getMedia(this.cds2.tokenLogin, data.media[1]._id).subscribe(response => {
        this.imgURL1 = response["path"];
        //this.nextProcess();
      }, error => {
        this.snackBar.open(error.error.message, "", {
          duration: 2000,
        });
      });
    }, error => {
      this.snackBar.open(error.error.message, "", {
        duration: 2000,
      });
    });
  }
  nextProcess() {
    this.displayInd = true;
    this.createForm();
    this.fileForm();
    if (this.dialogRef.componentInstance.data.ind == 'display') {
      this.displayInd = false;
      this.fileFor.disable()
      this.newUserForm.disable()

      this.bindDisplayValues(this.dialogRef.componentInstance.data.data1);
    } else if (this.dialogRef.componentInstance.data.ind == 'edit') {
      this.bindDisplayValues(this.dialogRef.componentInstance.data.data1);
    } else if (this.dialogRef.componentInstance.data.ind == 'create') {

    }
  }


  createForm() {
    this.newUserForm = this.fb.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      city: ['', Validators.required],
      region: ['', Validators.required],

      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      holderName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      taxNumber: ['', Validators.required],
      areaId:['']

    })
  }
  fileForm() {
    this.fileFor = this.fb.group({
      profile: ['', Validators.required],
      document: ['', Validators.required],

    })
  }
  clearScreen(oEvent) {
    this.newUserForm.reset();
    this.fileFor.reset();
    this.filevalid = false;
    this.filevalid1 = false;
  }
  createNewUser(oEvent) {
    debugger;
    if (this.newUserForm.valid ) {
      debugger;
      var filledData = this.newUserForm.value;
      var createData = {
        "name":{"title":filledData.title,
                "firstName":filledData.firstname,
                "lastName":filledData.lastname},
        "phoneNumber":filledData.phone,
        "email":filledData.email,
        "password":filledData.email,
        "areaId":filledData.areaId,
        "medias":[],
        "bankDeatils":{"accountNumber":filledData.accountNumber,
                        "accountType":filledData.accountType,
                        "holderName":filledData.holderName,
                        "ifscCode":filledData.ifscCode,
                        "bankName":filledData.bankName,
                        "branchName":filledData.branchName,
                        "taxNumber":filledData.taxNumber}
      };
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
      if (this.fileFor.controls['profile'].value == '' || this.fileFor.controls['profile'].value == null) {
        this.filevalid = true;
      } else {
        this.filevalid = false;
      }
      if (this.fileFor.controls['document'].value == '' || this.fileFor.controls['document'].value == null) {
        this.filevalid1 = true;
      } else {
        this.filevalid1 = false;
      }
    }
  }
  numberOnly(event): boolean {
    debugger;
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 43)
    return true;
    else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }else
    return true;
  }

  preview(files) {
    debugger;
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    var postData = {
      "file":this.imgURL,
      "name":files[0].name.split(".")[0],
      "type":mimeType
    }
  }
  bindDisplayValues(val) {
    this.newUserForm.patchValue({
      title: val.title,
      firstname: val.firstname,
      lastname: val.lastname,
      email: val.email,
      phone: val.ph,
      city: val.city,
      region: val.region,
      areaId:val.areaId,
      accountNumber: val.accountNumber,
      accountType: val.accountType,
      bankName: val.bankName,
      branchName: val.branchName,
      holderName: val.holderName,
      ifscCode: val.ifscCode,
      taxNumber: val.taxNumber
    })
  }
}

