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
    this.getAdminDetails();
  }
  getAdminDetails() {
    this.visible = true;
    this.cds.getAllAdminDetails(this.cds.tokenLogin).subscribe(response => {
      this.visible = false;
      var data = this.getTableData(response["admins"]);
      const ELEMENT_DATA = data;
      this.displayedColumns = ['firstname', 'lastname', 'email', 'ph', 'region', 'actions'];
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.cds.getAllAraeDetails(this.cds.tokenLogin).subscribe(response => {

      //   this.cds.areaData = this.getAreaData(response["areas"]);

      // }, error => {
      //   this.visible = false;
      //   this.snackBar.open(error.error.message, "", {
      //     duration: 2000,
      //   });
      // })
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
      if (val[i].areaId[0] === undefined || val[i].areaId[0].length === 0) {
        val[i].areaId[0] = { "areaCode": "", "formattedAddress": "", "_id": "" }
      }
      formatJson = {
        "title": val[i].name.title,
        "firstname": val[i].name.firstName,
        "lastname": val[i].name.lastName,
        "email": val[i].email,
        "ph": val[i].phoneNumber,
        "region": val[i].areaId[0].areaCode,
        "city": val[i].areaId[0].formattedAddress,
        "areaId": val[i].areaId[0]._id,
        "adminId": val[i]._id,
        "accountNumber": val[i].bankDetails.accountNumber,
        "accountType": val[i].bankDetails.accountType,
        "bankName": val[i].bankDetails.bankName,
        "branchName": val[i].bankDetails.branchName,
        "holderName": val[i].bankDetails.holderName,
        "ifscCode": val[i].bankDetails.ifscCode,
        "taxNumber": val[i].bankDetails.taxNumber,
        "superAdmin": val[i].isSuperAdmin,
        "activeAdmin": val[i].isActive,
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
      this.getAdminDetails();
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
      this.getAdminDetails();
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
    this.cds.deleteAreaAdmin(this.cds.tokenLogin, val.adminId).subscribe(response => {
      this.snackBar.open(response["message"], "", {
        duration: 2000,
      });
      this.getAdminDetails();
    }, error => {
      this.snackBar.open(error.error.error.message, "", {
        duration: 2000,
      });
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
  titleCollection: any[];
  profilePicId: any;
  documentId: any;
  superAdmin: boolean;
  activeAdmin: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddUser>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cds2: CommonServiceService) { }

  ngOnInit() {
    this.superAdmin = false;
    this.activeAdmin = true;
    this.profilePicId = "";
    this.documentId = "";
    this.region = this.cds2.areaData;
    var data = this.dialogRef.componentInstance.data.data1;
    this.titleCollection = [{ "title": "Mr." }, { "title": "Mrs." }, { "title": "Miss." }];
    this.nextProcess();
    if (this.dialogRef.componentInstance.data.ind !== 'create') {
      this.cds2.getMedia(this.cds2.tokenLogin, data.media[0]._id).subscribe(response => {
        this.imgURL = response["path"];
        this.profilePicId = response["_id"];
        this.cds2.getMedia(this.cds2.tokenLogin, data.media[1]._id).subscribe(response => {
          this.imgURL1 = response["path"];
          this.documentId = response["_id"];

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

  }
  nextProcess() {
    this.displayInd = true;
    this.createForm();
    var data = this.dialogRef.componentInstance.data.data1;
    this.superAdmin = data.superAdmin ? data.superAdmin : false;
    this.activeAdmin = data.activeAdmin ? data.activeAdmin : true;
    if (this.dialogRef.componentInstance.data.ind == 'display') {
      this.displayInd = false;
      this.newUserForm.disable();

      this.bindDisplayValues(data);
    } else if (this.dialogRef.componentInstance.data.ind == 'edit') {
      this.bindDisplayValues(data);
    } else if (this.dialogRef.componentInstance.data.ind == 'create') {
    }
  }


  createForm() {
    this.newUserForm = this.fb.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['+91', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      city: ['Bangalore', Validators.required],
      region: ['', Validators.required],

      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      holderName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      taxNumber: ['', Validators.required],
      areaId: [''],
      adminId: ['']

    })
  }

  clearScreen(oEvent) {
    this.newUserForm.reset();
    this.filevalid = false;
    this.filevalid1 = false;
    this.imgURL = "";
    this.imgURL1 = "";
    this.documentId = "";
    this.profilePicId = "";
  }
  createNewUser(oEvent) {
    if (this.newUserForm.valid && this.documentId != "" && this.profilePicId != "") {
      var medi = [];
      medi.push(this.profilePicId);
      medi.push(this.documentId);
      var filledData = this.newUserForm.value;
      var aId = "";
      for (var i = 0; i < this.cds2.areaData.length; i++) {
        if (filledData.region == this.cds2.areaData[i].code) {
          aId = this.cds2.areaData[i].id;
        }
      }

      if (this.dialogRef.componentInstance.data.ind == 'create') {
        var createData = {
          "name": {
            "title": filledData.title,
            "firstName": filledData.firstname,
            "lastName": filledData.lastname
          },
          "phoneNumber": filledData.phone,
          "email": filledData.email,
          "password": filledData.email,
          "areaId": aId,
          "medias": medi,
          "bankDetails": {
            "accountNumber": filledData.accountNumber,
            "accountType": filledData.accountType,
            "holderName": filledData.holderName,
            "ifscCode": filledData.ifscCode,
            "bankName": filledData.bankName,
            "branchName": filledData.branchName,
            "taxNumber": filledData.taxNumber
          },
          "isSuperAdmin": this.superAdmin,
          "isActive": this.activeAdmin
        };
        this.cds2.postAreaAdmin(this.cds2.tokenLogin, createData).subscribe(response => {
          this.snackBar.open(response["message"], "", {
            duration: 2000,
          });
          this.dialogRef.close();
        }, error => {
          this.snackBar.open(error.error.error.message, "", {
            duration: 2000,
          });
        });
      } else if (this.dialogRef.componentInstance.data.ind == 'edit') {
        var createData1 = {
          "name": {
            "title": filledData.title,
            "firstName": filledData.firstname,
            "lastName": filledData.lastname
          },
          "phoneNumber": filledData.phone,
          "email": filledData.email,
          //"password": filledData.email,
          "areaId": filledData.areaId,
          "medias": medi,
          "bankDetails": {
            "accountNumber": filledData.accountNumber,
            "accountType": filledData.accountType,
            "holderName": filledData.holderName,
            "ifscCode": filledData.ifscCode,
            "bankName": filledData.bankName,
            "branchName": filledData.branchName,
            "taxNumber": filledData.taxNumber
          },
          "isSuperAdmin": this.superAdmin,
          "isActive": this.activeAdmin
        };
        this.cds2.updateAreaAdmin(filledData.adminId, this.cds2.tokenLogin, createData1).subscribe(response => {
          this.snackBar.open(response["message"], "", {
            duration: 2000,
          });
          this.dialogRef.close();
        }, error => {
          this.snackBar.open(error.error.error.message, "", {
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
      if (this.profilePicId == "") {
        this.filevalid = true;
      } else {
        this.filevalid = false;
      }
      if (this.documentId == "") {
        this.filevalid1 = true;
      } else {
        this.filevalid1 = false;
      }
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 43)
      return true;
    else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else
      return true;
  }
  // IfscValidation(event): boolean {
  //   debugger;
  //   if (event.key.length < 5) {
  //     event.key =  event.key.toUpperCase();
  //   } else {
  //     const charCode = (event.which) ? event.which : event.keyCode;
  //     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //       return false;
  //     } else
  //       return true;
  //   }

  // }
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.snackBar.open("File Type Not supporting upload imgage only", "", {
        duration: 2000,
      });
      return;
    }
    if (files[0].size > 2000000) {
      this.snackBar.open("File size excceds 2MB", "", {
        duration: 2000,
      });
      return;
    }


    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('name', 'profile_pictre');
    this.cds2.postMedia(formData).subscribe(response => {
      this.imgURL = response["media"].path;
      this.profilePicId = response["media"]._id;
      this.filevalid = false;
    }, error => {
      this.snackBar.open(error.error.error.message, "", {
        duration: 2000,
      });
    });
  }
  previewDocument(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.snackBar.open("File Type Not supporting upload imgage only", "", {
        duration: 2000,
      });
      return;
    }
    if (files[0].size > 2000000) {
      this.snackBar.open("File size excceds 2MB", "", {
        duration: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('name', 'document');
    this.cds2.postMedia(formData).subscribe(response => {
      this.imgURL1 = response["media"].path;
      this.documentId = response["media"]._id;
      this.filevalid1 = false;
    }, error => {
      this.snackBar.open(error.error.error.message, "", {
        duration: 2000,
      });
    });

  }
  toggeleSuperAdmin(evt) {
    this.superAdmin = evt.checked;
  }
  toggeleAdminActive(evt) {
    this.activeAdmin = evt.checked;
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
      areaId: val.areaId,
      adminId: val.adminId,
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

