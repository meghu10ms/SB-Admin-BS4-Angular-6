import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { CommonServiceService } from '../../common-service.service';
import { ConfirmationDialogService } from '../components/confirmation-dialog/confirmation-dialog.service';

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
    private cds: CommonServiceService,
    private cnfr: ConfirmationDialogService) { }

  ngOnInit() {
    if (this.cds.tokenLogin === undefined) {
      this.cds.tokenLogin = sessionStorage.getItem("authToken");
    }
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

    }, error => {
      this.visible = false;
      this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
        duration: 2000,
      });
    })

  }
  getTableData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      let adminAreaData = val[i].areaId ? val[i].areaId : [];
      let adimnAreaObj = {};
      let adminAreaMainData = [];
      let regionStringArray = [];

      for (let j = 0; j < adminAreaData.length; j++) {
        adimnAreaObj = {
          "areaCode": adminAreaData[j].areaCode,
          "areaName": adminAreaData[j].formattedAddress,
          "areaObjId": adminAreaData[j]._id
        }
        regionStringArray.push(adminAreaData[j].areaCode);
        adminAreaMainData.push(adimnAreaObj);
        adimnAreaObj = {};
      }

      let medi = [], mediFile = val[i].medias, mediObj = {};
      for (let k = 0; k < mediFile.length; k++) {
        mediObj = {
          "_id": mediFile[k]._id,
          "path": this.cds.getFilePath(mediFile[k]._id)
        }
        medi.push(mediObj);
        mediObj = {};
      }

      formatJson = {
        "title": val[i].name ? val[i].name.title : "",
        "firstname": val[i].name ? val[i].name.firstName : "",
        "lastname": val[i].name ? val[i].name.lastName : "",
        "email": val[i].email ? val[i].email : "",
        "ph": val[i].phoneNumber ? val[i].phoneNumber : "",
        "region": regionStringArray ? regionStringArray : [],
        "areaDetails": adminAreaMainData ? adminAreaMainData : [],
        "adminId": val[i]._id ? val[i]._id : "",
        "accountNumber": val[i].bankDetails ? val[i].bankDetails.accountNumber : "",
        "accountType": val[i].bankDetails ? val[i].bankDetails.accountType : "",
        "bankName": val[i].bankDetails ? val[i].bankDetails.bankName : "",
        "branchName": val[i].bankDetails ? val[i].bankDetails.branchName : "",
        "holderName": val[i].bankDetails ? val[i].bankDetails.holderName : "",
        "ifscCode": val[i].bankDetails ? val[i].bankDetails.ifscCode : "",
        "taxNumber": val[i].bankDetails ? val[i].bankDetails.taxNumber : "",
        "superAdmin": val[i].isSuperAdmin ? true : false,
        "activeAdmin": val[i].isActive ? true : false,
        "media": val[i].medias ? medi : []
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }

  add() {
    const dialogRef = this.dialog.open(AddUser, {
      data: { ind: "create", data1: "" }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
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
      data: { ind: "edit", data1: val }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.getAdminDetails();
    });
  }
  display(val) {
    const dialogRef = this.dialog.open(AddUser, {
      data: { ind: "display", data1: val }
    })
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  remove(val) {
    this.cnfr.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.cds.deleteAreaAdmin(this.cds.tokenLogin, val.adminId).subscribe(response => {
            this.snackBar.open(response["message"], "", {
              duration: 2000,
            });
            this.getAdminDetails();
          }, error => {
            this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
              duration: 2000,
            });
          });
        }
      })
      .catch(() => {
        console.log('User dismissed the')
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
  dob: string;
}

@Component({
  templateUrl: 'add-user.html',
})
export class AddUser implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  val: any;
  pftelpat = "^[6789]{1}[0-9]{9}$";
  filevalid: any;
  displayInd: any;

  public imagePath;
  imgURL: any;
  region: any[];
  titleCollection: any[];
  profilePicId: any;

  constructor(
    public dialogRef: MatDialogRef<AddUser>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cds2: CommonServiceService) { }

  ngOnInit() {
    this.profilePicId = "";
    this.imgURL = "../assets/images/avtar.png";
    this.region = this.cds2.areaData;
    var data = this.dialogRef.componentInstance.data.data1;
    this.titleCollection = [{ "title": "Mr." }, { "title": "Mrs." }, { "title": "Miss." }];
    this.nextProcess();
    if (this.dialogRef.componentInstance.data.ind !== 'create') {

    }

  }
  nextProcess() {
    this.displayInd = true;
    this.createForm();
    var data = this.dialogRef.componentInstance.data.data1;
    if (this.dialogRef.componentInstance.data.ind == 'display') {
      this.displayInd = false;
      this.firstFormGroup.disable();
      this.secondFormGroup.disable();
      this.bindDisplayValues(data);
    } else if (this.dialogRef.componentInstance.data.ind == 'edit') {
      this.bindDisplayValues(data);
    } else if (this.dialogRef.componentInstance.data.ind == 'create') {
    }
  }


  createForm() {
    this.firstFormGroup = this.fb.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['+91', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      region: ['', Validators.required],
      isSuperAdmin: [],
      isActive: [true]
    })
    this.secondFormGroup = this.fb.group({
      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      holderName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      taxNumber: ['', Validators.required],
      areaDetails: [''],
      adminId: ['']
    })

  }
  close() {
    this.dialogRef.close({ action: "no" });
  }

  clearScreen(oEvent) {
    this.filevalid = false;
    this.imgURL = "";
    this.profilePicId = "";
  }
  createNewUser(oEvent) {
    if (this.profilePicId != "" && this.firstFormGroup.value && this.secondFormGroup.valid) {
      var medi = [];
      medi.push(this.profilePicId);
      var filledData1 = this.firstFormGroup.value;
      var filledData2 = this.secondFormGroup.value;
      var aId = [];

      this.cds2.areaData.forEach(function (obj) {
        for (let x = 0; x < filledData1.region.length; x++) {
          if (obj.code === filledData1.region[x]) {
            aId.push(obj.id);
          }
        }
      });

      if (this.dialogRef.componentInstance.data.ind == 'create') {
        var createData = {
          "name": {
            "title": filledData1.title,
            "firstName": filledData1.firstname,
            "lastName": filledData1.lastname
          },
          "phoneNumber": filledData1.phone,
          "email": filledData1.email,
          "password": filledData1.email,
          "areaId": aId,
          "medias": medi,
          "bankDetails": {
            "accountNumber": filledData2.accountNumber,
            "accountType": filledData2.accountType,
            "holderName": filledData2.holderName,
            "ifscCode": filledData2.ifscCode,
            "bankName": filledData2.bankName,
            "branchName": filledData2.branchName,
            "taxNumber": filledData2.taxNumber
          },
          "isSuperAdmin": filledData1.isSuperAdmin ? true : false,
          "isActive": filledData1.isActive ? true : false
        };
        this.cds2.postAreaAdmin(this.cds2.tokenLogin, createData).subscribe(response => {
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
        var createData1 = {
          "name": {
            "title": filledData1.title,
            "firstName": filledData1.firstname,
            "lastName": filledData1.lastname
          },
          "phoneNumber": filledData1.phone,
          "email": filledData1.email,
          //"password": filledData.email,
          "areaId": aId,
          "medias": medi,
          "bankDetails": {
            "accountNumber": filledData2.accountNumber,
            "accountType": filledData2.accountType,
            "holderName": filledData2.holderName,
            "ifscCode": filledData2.ifscCode,
            "bankName": filledData2.bankName,
            "branchName": filledData2.branchName,
            "taxNumber": filledData2.taxNumber
          },
          "isSuperAdmin": filledData1.isSuperAdmin ? true : false,
          "isActive": filledData1.isActive ? true : false
        };
        this.cds2.updateAreaAdmin(filledData1.adminId, this.cds2.tokenLogin, createData1).subscribe(response => {
          this.snackBar.open(response ? response["message"] : "", "", {
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
      if (this.profilePicId == "") {
        this.filevalid = true;
      } else {
        this.filevalid = false;
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
  goForward(stepper: MatStepper) {
    if (this.profilePicId !== "")
      this.filevalid = false;
    else
      this.filevalid = true;
    if (this.firstFormGroup.valid && !this.filevalid)
      stepper.next();
    else
      return;
  }
  // IfscValidation(event): boolean {
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
      this.imgURL = response ? response["media"].path : "";
      this.profilePicId = response ? response["media"]._id : "";
      this.filevalid = false;
    }, error => {
      this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
        duration: 2000,
      });
    });
  }


  bindDisplayValues(val) {
    this.imgURL = val.media[0] ? val.media[0].path : "";
    this.profilePicId = val.media[0] ? val.media[0]._id : "";
    this.firstFormGroup.patchValue({
      title: val.title,
      firstname: val.firstname,
      lastname: val.lastname,
      email: val.email,
      phone: val.ph,
      region: val.region,
      isSuperAdmin: val.superAdmin,
      isActive: val.activeAdmin
    })
    this.secondFormGroup.patchValue({
      areaDetails: val.areaDetails,
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