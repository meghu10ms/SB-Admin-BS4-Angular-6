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
    private cds: CommonServiceService,
    private cnfr: ConfirmationDialogService) { }

  ngOnInit() {
    if (this.cds.tokenLogin === undefined) {
      this.cds.tokenLogin = sessionStorage.getItem("authToken");
    }
    this.getSupplierDetails();
  }
  getSupplierDetails() {
    this.visible = true;
    this.cds.getAllDelivaryPartnerDetails(this.cds.tokenLogin).subscribe(response => {
      this.data = this.getTableData(response["vendors"]);
      const ELEMENT_DATA = this.data;
      this.displayedColumns = ['firstname', 'email', 'uid', 'ph', 'bloodGroup', 'regionName', 'actions'];
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

  getTableData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      let medi = [], mediFile = val[i].medias, mediObj = {};
      for (let k = 0; k < mediFile.length; k++) {
        mediObj = {
          "_id": mediFile[k]._id,
          "path": this.cds.getFilePath(mediFile[k]._id)
        }
        medi.push(mediObj);
        mediObj = {};
      }
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


        "deliveryPartnerObjId": val[i]._id,
        "region": val[i].areaId ? val[i].areaId._id : "",
        "regionName": val[i].areaId ? val[i].areaId.areaCode : "",


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
        "media": val[i].medias ? medi : [],
        //"documentId": val[i].medias ? val[i].medias[0]._id : ""
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
    this.cnfr.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
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
      })
      .catch(() => {
        console.log('User dismissed the')
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
  regionName: string;
  address: string;
  city: string;
  uid: string;
}


@Component({
  templateUrl: 'add-user.html',
})
export class AddUser implements OnInit {
  val: any;
  filevalid: any;
  displayInd: any;

  public imagePath;
  imgURL: any;
  region: any[];
  vendorSelecton: any[];
  titleCollection: any[];
  profilePicId: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

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
    this.vendorSelecton = this.dialogRef.componentInstance.data.data;
    var data = this.dialogRef.componentInstance.data.data1;
    this.titleCollection = [{ "title": "Mr" }, { "title": "Mrs" }, { "title": "Miss" }];
    this.nextProcess();
    if (this.dialogRef.componentInstance.data.ind !== 'create') {
      // this.cds2.getMedia(this.cds2.tokenLogin, data.media[0]._id).subscribe(response => {
      //   this.imgURL = response["path"];
      //   this.profilePicId = response["_id"];
      // }, error => {
      //   this.snackBar.open((error.error.error ? error.error.error.message : error.error.message), "", {
      //     duration: 2000,
      //   });
      // });
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
      this.thirdFormGroup.disable();
      this.fourthFormGroup.disable();

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
      bloodGroup: ['', Validators.required],

      isDeliveryPartner: [true],
      isRetailer: [],
      isActive: [true]
    });
    this.secondFormGroup = this.fb.group({
      PflatNumber: ['', Validators.required],
      Pstreet: [''],
      PlandMark: [''],
      Pcity: ['Bangalore', Validators.required],
      Pstate: ['Karnataka', Validators.required],
      Pcountry: ['India', Validators.required],
      PpostalCode: ['', Validators.required]
    });
    this.thirdFormGroup = this.fb.group({
      CflatNumber: ['', Validators.required],
      Cstreet: [''],
      ClandMark: [''],
      Ccity: ['Bangalore', Validators.required],
      Cstate: ['Karnataka', Validators.required],
      Ccountry: ['India', Validators.required],
      CpostalCode: ['', Validators.required]
    });
    this.fourthFormGroup = this.fb.group({
      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      holderName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      panNumber: [''],
      region: ['', Validators.required],
      relatedVendor: [''],
      areaId: [''],
      deliveryPartnerId: [''],
      deliveryPartnerObjId: ['']
    });
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

  createNewUser(oEvent) {
    if (this.profilePicId != "" && this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup.valid) {
      var medi = [];
      medi.push(this.profilePicId);
      var filledData1 = this.firstFormGroup.value;
      var filledData2 = this.secondFormGroup.value;
      var filledData3 = this.thirdFormGroup.value;
      var filledData4 = this.fourthFormGroup.value;


      if (this.dialogRef.componentInstance.data.ind == 'create') {
        var createData = {
          "name": {
            "title": filledData1.title,
            "firstName": filledData1.firstname,
            "lastName": filledData1.lastname
          },
          "address": {
            "flatNumber": filledData2.PflatNumber,
            "street": filledData2.Pstreet,
            "landMark": filledData2.PlandMark,
            "city": filledData2.Pcity,
            "state": filledData2.Pstate,
            "country": filledData2.Pcountry,
            "postalCode": filledData2.PpostalCode,
            "formattedAddress": "all the Above",
          },
          "currentAddress": {
            "flatNumber": filledData3.CflatNumber,
            "street": filledData3.Cstreet,
            "landMark": filledData3.ClandMark,
            "city": filledData3.Ccity,
            "state": filledData3.Cstate,
            "country": filledData3.Ccountry,
            "postalCode": filledData3.CpostalCode,
            "formattedAddress": "all the Above",
          },
          "phoneNumber": filledData1.phone,
          "email": filledData1.email,

          "relatedVendor": filledData4.relatedVendor,
          "areaId": filledData4.region,
          "bloodGroup": filledData1.bloodGroup,
          "formattedAddress": "all the Above",
          "medias": medi,

          "bankDetails": {
            "accountNumber": filledData4.accountNumber,
            "accountType": filledData4.accountType,
            "holderName": filledData4.holderName,
            "ifscCode": filledData4.ifscCode,
            "bankName": filledData4.bankName,
            "branchName": filledData4.branchName,
            "panNumber": filledData4.taxNumber
          },
          "isActive": filledData1.isActive ? true : false,
          "isRetailer": filledData1.isRetailer ? true : false,
          "isDeliveryPartner": filledData1.isDelivaryPartner ? true : false
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
            "title": filledData1.title,
            "firstName": filledData1.firstname,
            "lastName": filledData1.lastname
          },
          "address": {
            "flatNumber": filledData2.PflatNumber,
            "street": filledData2.Pstreet,
            "landMark": filledData2.PlandMark,
            "city": filledData2.Pcity,
            "state": filledData2.Pstate,
            "country": filledData2.Pcountry,
            "postalCode": filledData2.PpostalCode,
            "formattedAddress": "all the Above",
          },
          "currentAddress": {
            "flatNumber": filledData3.CflatNumber,
            "street": filledData3.Cstreet,
            "landMark": filledData3.ClandMark,
            "city": filledData3.Ccity,
            "state": filledData3.Cstate,
            "country": filledData3.Ccountry,
            "postalCode": filledData3.CpostalCode,
            "formattedAddress": "all the Above",
          },
          "phoneNumber": filledData1.phone,
          "email": filledData1.email,

          "relatedVendor": filledData4.relatedVendor,
          "areaId": filledData4.region,
          "bloodGroup": filledData1.bloodGroup,
          "formattedAddress": "all the Above",
          "medias": medi,

          "bankDetails": {
            "accountNumber": filledData4.accountNumber,
            "accountType": filledData4.accountType,
            "holderName": filledData4.holderName,
            "ifscCode": filledData4.ifscCode,
            "bankName": filledData4.bankName,
            "branchName": filledData4.branchName,
            "panNumber": filledData4.taxNumber
          },
          "isActive": filledData1.isActive ? true : false,
          "isRetailer": filledData1.isRetailer ? true : false,
          "isDeliveryPartner": filledData1.isDelivaryPartner ? true : false
        };
        this.cds2.updateDelivaryPartner(filledData4.deliveryPartnerObjId, this.cds2.tokenLogin, createData1).subscribe(response => {
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
      if (this.profilePicId == "") {
        this.filevalid = true;
        this.snackBar.open("Plese Choose Profile Photo", "", {
          duration: 2000,
        });
      } else {
        this.filevalid = false;
      }

    }
  }

  CloseUser() {
    this.dialogRef.close({ action: "no" });
  }
  copyPermanent(event) {
    debugger;
    if (event.checked) {
      if (!this.secondFormGroup.valid)
        return;
      var seldata = this.secondFormGroup.value;
      this.thirdFormGroup.patchValue({
        CflatNumber: seldata.PflatNumber,
        Cstreet: seldata.Pstreet,
        ClandMark: seldata.PlandMark,
        Ccity: seldata.Pcity,
        Cstate: seldata.Pstate,
        Ccountry: seldata.Pcountry,
        CpostalCode: seldata.PpostalCode,
      });
    } else {
      this.thirdFormGroup.reset();
    }

  }
  bindDisplayValues(val) {
    this.imgURL = val.media[0] ? val.media[0].path : "";
    this.profilePicId = val.media[0] ? val.media[0]._id : "";
    this.firstFormGroup.patchValue({
      title: val.title,
      firstname: val.firstname,
      lastname: val.lastname,
      phone: val.ph,
      email: val.email,
      bloodGroup: val.bloodGroup,
      isRetailer: val.isRetailer,
      isVendor: val.isVendor,
      isActive: val.isActive
    });
    this.secondFormGroup.patchValue({
      PflatNumber: val.PflatNumber,
      Pstreet: val.Pstreet,
      PlandMark: val.PlandMark,
      Pcity: val.Pcity,
      Pstate: val.Pstate,
      Pcountry: val.Pcountry,
      PpostalCode: val.PpostalCode,
    });
    this.thirdFormGroup.patchValue({
      CflatNumber: val.CflatNumber,
      Cstreet: val.Cstreet,
      ClandMark: val.ClandMark,
      Ccity: val.Ccity,
      Cstate: val.Cstate,
      Ccountry: val.Ccountry,
      CpostalCode: val.CpostalCode,
    });
    this.fourthFormGroup.patchValue({
      accountNumber: val.accountNumber,
      accountType: val.accountType,
      bankName: val.bankName,
      branchName: val.branchName,
      holderName: val.holderName,
      ifscCode: val.ifscCode,
      panNumber: val.panNumber,
      region: val.region,
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
