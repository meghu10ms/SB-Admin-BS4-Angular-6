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
  data: any;
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
  animations: [routerTransition()]
})
export class SupplierComponent implements OnInit {

  visible: any;
  dataSource: any;
  data: any;
  vendorDetails: any;
  displayedColumns: string[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public comments = [];
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cds: CommonServiceService) { }

  ngOnInit() {
    if (this.cds.tokenLogin === undefined) {
      this.cds.tokenLogin = sessionStorage.getItem("authToken");
    }
    this.getSupplierDetails();
  }
  getSupplierDetails() {
    this.visible = true;
    this.cds.getAllDelivaryPartnerDetails(this.cds.tokenLogin).subscribe(response => {
      //this.visible = false;
      this.data = this.getTableData(response["vendors"]);
      const ELEMENT_DATA = this.data;
      this.displayedColumns = ['firstname', 'email', 'uid', 'ph', 'bloodGroup', 'region', 'actions'];
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cds.getAllVendorDetails(this.cds.tokenLogin).subscribe(response => {
        this.visible = false;
        this.vendorDetails = this.getTableVendorData(response["vendors"]);

      }, error => {
        this.visible = false;
        this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
          duration: 2000,
        });
      })

    }, error => {
      this.visible = false;
      this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
        duration: 2000,
      });
    })

  }
  insertAreaToDelivaryPartner() {
    if (!this.cds.areaData) {
      return;
    }
    this.data.forEach(element => {
      for (var i = 0; i < this.cds.areaData.length; i++) {
        if (element.areaId == this.cds.areaData[i].id) {
          element.region = this.cds.areaData[i].code;
          break;
        }
      }
    });
  }
  getTableData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {

      let relVand = (val[i].relatedVendor ? val[i].relatedVendor : []),
        finalVen = [], relatedVendorObjIdArray = [];
      for (var j = 0; j < relVand.length; j++) {
        let sVen = {};
        sVen = {
          "vendorId": relVand[j].vendorId ? relVand[j].vendorId : "",
          "vendorObjId": relVand[j]._id ? relVand[j]._id : "",
          "vendorUid": relVand[j].uid ? relVand[j].uid : "",
          "companyName": relVand[j].companyName ? relVand[j].companyName : ""
        }
        finalVen.push(sVen);
        relatedVendorObjIdArray.push(relVand[j]._id);
        sVen = {};
      }
      formatJson = {
        "title": val[i].name ? val[i].name.title : "",
        "firstname": val[i].name ? val[i].name.firstName : "",
        "lastname": val[i].name ? val[i].name.lastName : "",
        "email": val[i].email,
        "ph": val[i].phoneNumber ? val[i].phoneNumber : "",

        "bloodGroup": val[i].bloodGroup,
        "uid": val[i].uid,
        "deliveryPartnerId": val[i].deliveryPartnerId,

        "areaId": val[i].areaId,
        "deliveryPartnerObjId": val[i]._id,
        "region": val[i].areaId ? val[i].areaId.areaCode : "",
        "regionName": val[i].areaId ? val[i].formattedAddress : "",


        "Pcity": val[i].address ? val[i].address.city : "",
        "Pcountry": val[i].address ? val[i].address.country : "",
        "PflatNumber": val[i].address ? (val[i].address.flatNumber ? val[i].address.flatNumber : "") : "",
        "PlandMark": val[i].address ? val[i].address.landMark : "",
        "PpostalCode": val[i].address ? val[i].address.postalCode : "",
        "Pstate": val[i].address ? val[i].address.state : "",
        "street": val[i].address ? (val[i].address.street ? val[i].address.street : "") : "",

        "Ccity": val[i].currentAddress ? val[i].currentAddress.city : "",
        "Ccountry": val[i].currentAddress ? val[i].currentAddress.country : "",
        "CflatNumber": val[i].currentAddress ? (val[i].currentAddress.flatNumber ? val[i].currentAddress.flatNumber : "") : "",
        "ClandMark": val[i].currentAddress ? val[i].currentAddress.landMark : "",
        "CpostalCode": val[i].currentAddress ? val[i].currentAddress.postalCode : "",
        "Cstate": val[i].currentAddress ? val[i].currentAddress.state : "",
        "Cstreet": val[i].currentAddress ? val[i].currentAddress.street : "",

        "accountNumber": val[i].bankDetails ? val[i].bankDetails.accountNumber : "",
        "accountType": val[i].bankDetails ? val[i].bankDetails.accountType : "",
        "bankName": val[i].bankDetails ? val[i].bankDetails.bankName : "",
        "branchName": val[i].bankDetails ? val[i].bankDetails.branchName : "",
        "holderName": val[i].bankDetails ? val[i].bankDetails.holderName : "",
        "ifscCode": val[i].bankDetails ? val[i].bankDetails.ifscCode : "",
        //"panNumber": val[i].bankDetails ? val[i].bankDetails.taxNumber : "",

        "isRetailer": val[i].isRetailer ? val[i].isRetailer : "",
        "isDelivaryPartner": val[i].isDelivaryPartner ? val[i].isDelivaryPartner : "",
        "isActive": val[i].isActive,
        "relatedVendor": val[i].relatedVendor ? finalVen : [],
        "selectedVendor": relatedVendorObjIdArray ? relatedVendorObjIdArray : [],
        "media": val[i].medias ? val[i].medias : "",
        "documentId": val[i].medias ? val[i].medias[0]._id : ""
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }
  getTableVendorData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {

      formatJson = {
        "firstname": val[i].ownerName ? val[i].ownerName.firstName : "",
        "lastname": val[i].ownerName ? val[i].ownerName.lastName : "",
        "email": val[i].email ? val[i].email : "",
        "ph": val[i].phoneNumber ? val[i].phoneNumber : "",
        "uid": val[i].uid ? val[i].uid : "",
        "companyname": val[i].companyName ? val[i].companyName : "",
        "vendorId": val[i].vendorId ? val[i].vendorId : "",
        "vendorObjId": val[i]._id ? val[i]._id : "",
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }

  add() {
    const dialogRef = this.dialog.open(AddUser, {

      data: { ind: "create", data1: "", data: this.vendorDetails }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.getSupplierDetails();
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
      data: { ind: "edit", data1: val, data: this.vendorDetails }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === "yes")
        this.getSupplierDetails();
    });
  }
  display(val) {
    const dialogRef = this.dialog.open(AddUser, {
      data: { ind: "display", data1: val, data: this.vendorDetails }
    })
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  remove(val) {
    this.cds.deleteDelivaryPartner(val.deliveryPartnerObjId, this.cds.tokenLogin).subscribe(response => {
      this.snackBar.open(response["message"], "", {
        duration: 2000,
      });
      this.getSupplierDetails();
    }, error => {
      this.snackBar.open(error.error.error.message, "", {
        duration: 2000,
      });
    });
  }
  onIndidualVendor(event, value) {
    const dialogRefCalculation = this.dialog.open(PaymentCalaculation, {
      data: { data: value }
    })
    dialogRefCalculation.afterClosed().subscribe(result => {
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
  uid: string;
}


@Component({
  templateUrl: 'add-user.html',
})
export class AddUser implements OnInit {
  newUserForm: FormGroup;
  val: any;
  pftelpat = "^[6789]{1}[0-9]{9}$";
  filevalid: any;
  filevalid1: any;
  displayInd: any;

  public imagePath;
  imgURL: any;
  imgDocument: any;
  imgDocumentId: any;
  public message: string;
  region: any[];
  vendorSelecton: any[];
  titleCollection: any[];
  profilePicId: any;
  Retailer: boolean;
  isDelivary: boolean;
  activeDelivaryPartner: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddUser>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cds2: CommonServiceService) { }

  ngOnInit() {
    this.Retailer = false;
    this.isDelivary = true;
    this.activeDelivaryPartner = true;
    this.profilePicId = "";

    this.region = this.cds2.areaData;
    this.vendorSelecton = this.dialogRef.componentInstance.data.data;
    var data = this.dialogRef.componentInstance.data.data1;
    this.titleCollection = [{ "title": "Mr" }, { "title": "Mrs" }, { "title": "Miss" }];
    this.nextProcess();
    if (this.dialogRef.componentInstance.data.ind !== 'create') {
      this.cds2.getMedia(this.cds2.tokenLogin, data.media[0]._id).subscribe(response => {
        this.imgURL = response["path"];
        this.profilePicId = response["_id"];
      }, error => {
        this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
          duration: 2000,
        });
      });
    }
  }
  nextProcess() {
    this.displayInd = true;
    this.createForm();
    var data = this.dialogRef.componentInstance.data.data1;
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
      region: ['', Validators.required],
      bloodGroup: ['', Validators.required],

      PflatNumber: ['', Validators.required],
      Pstreet: ['', Validators.required],
      PlandMark: ['', Validators.required],
      Pcity: ['Bangalore', Validators.required],
      Pstate: ['Karnataka', Validators.required],
      Pcountry: ['India', Validators.required],
      PpostalCode: ['', Validators.required],

      CflatNumber: ['', Validators.required],
      Cstreet: ['', Validators.required],
      ClandMark: ['', Validators.required],
      Ccity: ['Bangalore', Validators.required],
      Cstate: ['Karnataka', Validators.required],
      Ccountry: ['India', Validators.required],
      CpostalCode: ['', Validators.required],

      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      holderName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      panNumber: ['', Validators.required],
      relatedVendor: [''],
      areaId: [''],
      deliveryPartnerId: [''],
      deliveryPartnerObjId: ['']
    })
  }

  clearScreen(oEvent) {
    this.newUserForm.reset();
    this.filevalid = false;
    this.filevalid1 = false;
    this.imgURL = "";
    this.profilePicId = "";
    this.imgDocument = "";
    this.imgDocumentId = "";
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

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
      this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
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
      this.imgDocument = response["media"].path;
      this.imgDocumentId = response["media"]._id;
      this.filevalid = false;
    }, error => {
      this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
        duration: 2000,
      });
    });
  }

  createNewUser(oEvent) {
    if (this.newUserForm.valid && this.profilePicId != "") {
      var medi = [];
      medi.push(this.profilePicId);
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
          "address": {
            "flatNumber": filledData.PflatNumber,
            "street": filledData.Pstreet,
            "landMark": filledData.PlandMark,
            "city": filledData.Pcity,
            "state": filledData.Pstate,
            "country": filledData.Pcountry,
            "postalCode": filledData.PpostalCode,
            "formattedAddress": "all the Above",
          },
          "currentAddress": {
            "flatNumber": filledData.CflatNumber,
            "street": filledData.Cstreet,
            "landMark": filledData.ClandMark,
            "city": filledData.Ccity,
            "state": filledData.Cstate,
            "country": filledData.Ccountry,
            "postalCode": filledData.CpostalCode,
            "formattedAddress": "all the Above",
          },
          "phoneNumber": filledData.phone,
          "email": filledData.email,

          "relatedVendor": filledData.relatedVendor,
          "areaId": aId,
          "bloodGroup": filledData.bloodGroup,
          "formattedAddress": "all the Above",
          "medias": medi,

          "bankDetails": {
            "accountNumber": filledData.accountNumber,
            "accountType": filledData.accountType,
            "holderName": filledData.holderName,
            "ifscCode": filledData.ifscCode,
            "bankName": filledData.bankName,
            "branchName": filledData.branchName,
            "panNumber": filledData.taxNumber
          },
          "isActive": this.activeDelivaryPartner,
          "isRetailer": this.Retailer,
          "isDeliveryPartner": this.isDelivary
        };
        this.cds2.postDelivaryPartner(this.cds2.tokenLogin, createData).subscribe(response => {
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
            "title": filledData.title,
            "firstName": filledData.firstname,
            "lastName": filledData.lastname
          },
          "address": {
            "flatNumber": filledData.PflatNumber,
            "street": filledData.Pstreet,
            "landMark": filledData.PlandMark,
            "city": filledData.Pcity,
            "state": filledData.Pstate,
            "country": filledData.Pcountry,
            "postalCode": filledData.PpostalCode,
            "formattedAddress": "all the Above",
          },
          "currentAddress": {
            "flatNumber": filledData.CflatNumber,
            "street": filledData.Cstreet,
            "landMark": filledData.ClandMark,
            "city": filledData.Ccity,
            "state": filledData.Cstate,
            "country": filledData.Ccountry,
            "postalCode": filledData.CpostalCode,
            "formattedAddress": "all the Above",
          },
          "phoneNumber": filledData.phone,
          "email": filledData.email,
          "relatedVendor": filledData.relatedVendor,
          "areaId": aId,
          "bloodGroup": filledData.bloodGroup,
          "formattedAddress": "all the Above",
          "medias": medi,

          "bankDetails": {
            "accountNumber": filledData.accountNumber,
            "accountType": filledData.accountType,
            "holderName": filledData.holderName,
            "ifscCode": filledData.ifscCode,
            "bankName": filledData.bankName,
            "branchName": filledData.branchName,
            "panNumber": filledData.taxNumber
          },
          "isActive": this.activeDelivaryPartner,
          "isRetailer": this.Retailer,
          "isDeliveryPartner": this.isDelivary
        };
        this.cds2.updateDelivaryPartner(filledData.deliveryPartnerObjId, this.cds2.tokenLogin, createData1).subscribe(response => {
          this.snackBar.open(response["message"], "", {
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

    }
  }
  toggeleActive(evt) {
    this.activeDelivaryPartner = evt.checked;
  }
  toggeleRetailer(evt) {
    this.Retailer = evt.checked;
  }
  toggeleDelivary(evt) {
    this.isDelivary = evt.checked;
  }
  CloseUser() {
    this.dialogRef.close({ action: "no" });
  }
  bindDisplayValues(val) {
    this.newUserForm.patchValue({
      title: val.title,
      firstname: val.firstname,
      lastname: val.lastname,
      phone: val.ph,
      email: val.email,
      bloodGroup: val.bloodGroup,
      region: val.region,

      PflatNumber: val.PflatNumber,
      Pstreet: val.Pstreet,
      PlandMark: val.PlandMark,
      Pcity: val.Pcity,
      Pstate: val.Pstate,
      Pcountry: val.Pcountry,
      PpostalCode: val.PpostalCode,

      CflatNumber: val.CflatNumber,
      Cstreet: val.Cstreet,
      ClandMark: val.ClandMark,
      Ccity: val.Ccity,
      Cstate: val.Cstate,
      Ccountry: val.Ccountry,
      CpostalCode: val.CpostalCode,

      accountNumber: val.accountNumber,
      accountType: val.accountType,
      bankName: val.bankName,
      branchName: val.branchName,
      holderName: val.holderName,
      ifscCode: val.ifscCode,
      panNumber: val.panNumber,
      areaId: val.areaId,
      deliveryPartnerId: val.deliveryPartnerId,
      deliveryPartnerObjId: val.deliveryPartnerObjId,
      relatedVendor: val.selectedVendor
    })
  }
}


@Component({
  templateUrl: 'payment-calculation.html',
})
export class PaymentCalaculation implements OnInit {

  constructor(
    public dialogRefCalculation: MatDialogRef<AddUser>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cds2: CommonServiceService) { }

  ngOnInit() {

  }
  ClosePaymentCalculation() {
    this.dialogRefCalculation.close({ action: "no" });
  }
  PaymentEstimate() {

  }

}
