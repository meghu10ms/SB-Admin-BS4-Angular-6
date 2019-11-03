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
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    visible: any;
    dataSource: any;
    displayedColumns: string[];

    //displayedColumns: string[] = ['firstname', 'lastname', 'email', 'ph', 'region', 'actions'];
    //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    public comments = [];
    constructor(
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private cds: CommonServiceService) { }

    ngOnInit() {
        this.getVendorDetails();
    }
    getVendorDetails() {
        this.visible = true;
        this.cds.getAllVendorDetails(this.cds.tokenLogin).subscribe(response => {
            this.visible = false;
            var data = this.getTableData(response["vendors"]);
            const ELEMENT_DATA = data;
            this.displayedColumns = ['firstname', 'companyname', 'email', 'ph', 'region', 'actions'];
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
            if (val[i].areaId === undefined) {
                val[i].areaId = { "areaCode": "", "formattedAddress": "", "_id": "" }
            }
            formatJson = {
                "title": val[i].ownerName.title,
                "firstname": val[i].ownerName.firstName,
                "lastname": val[i].ownerName.lastName,
                "email": val[i].email,
                "ph": val[i].phoneNumber,

                "companyname": val[i].companyName,
                "cin": val[i].cin,
                "registratedAuthority": val[i].registratedAuthority,
                "registrationNumber": val[i].registrationNumber,
                "registrationYear": val[i].registrationYear,
                "vendorId": val[i].vendorId,
                "areaId": val[i].areaId,
                "vendorObjId": val[i]._id,
                "city": val[i].ownerAddress.city,
                "country": val[i].ownerAddress.country,
                "flatNumber": val[i].ownerAddress.flatNumber,
                "landMark": val[i].ownerAddress.landMark,
                "postalCode": val[i].ownerAddress.postalCode,
                "state": val[i].ownerAddress.state,
                "street": val[i].ownerAddress.street,

                "longitude": val[i].areaId.location["coordinates"][0],
                "latitude": val[i].areaId.location["coordinates"][1],
                "region": val[i].areaId.areaCode,


                "accountNumber": val[i].bankDetails.accountNumber,
                "accountType": val[i].bankDetails.accountType,
                "bankName": val[i].bankDetails.bankName,
                "branchName": val[i].bankDetails.branchName,
                "holderName": val[i].bankDetails.holderName,
                "ifscCode": val[i].bankDetails.ifscCode,
                "taxNumber": val[i].bankDetails.taxNumber,
                "isRetailer": val[i].isRetailer,
                "activeAdmin": val[i].isActive,
                "isVendor": val[i].isVendor,
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
            this.getVendorDetails();
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
            this.getVendorDetails();
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
    product(val) {
        const dialogRefProduct = this.dialog.open(ProductDetails, {
            width: '70%',
            height: '65%',
            data: { data1: val }
        })
        dialogRefProduct.afterClosed().subscribe(result => {
        });
    }
}

export interface PeriodicElement {
    firstname: string;
    companyname: string;
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
    val: any;
    pftelpat = "^[6789]{1}[0-9]{9}$";
    filevalid: any;
    filevalid1: any;
    displayInd: any;

    public imagePath;
    imgURL: any;
    public message: string;
    region: any[];
    titleCollection: any[];
    profilePicId: any;
    Retailer: boolean;
    Vendor: boolean;
    activeVendor: boolean;

    constructor(
        public dialogRef: MatDialogRef<AddUser>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private cds2: CommonServiceService) { }

    ngOnInit() {
        this.Retailer = false;
        this.Vendor = true;
        this.activeVendor = true;
        this.profilePicId = "";

        this.region = this.cds2.areaData;
        var data = this.dialogRef.componentInstance.data.data1;
        this.titleCollection = [{ "title": "Mr" }, { "title": "Mrs" }, { "title": "Miss" }];
        this.nextProcess();
        if (this.dialogRef.componentInstance.data.ind !== 'create') {
            this.cds2.getMedia(this.cds2.tokenLogin, data.media[0]._id).subscribe(response => {
                this.imgURL = response["path"];
                this.profilePicId = response["_id"];
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
        //this.superAdmin = data.superAdmin ? data.superAdmin : false;
        //this.activeAdmin = data.activeAdmin ? data.activeAdmin : true;
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
            flatNumber: ['', Validators.required],
            street: ['', Validators.required],
            landMark: ['', Validators.required],
            city: ['Bangalore', Validators.required],
            state: ['Karnataka', Validators.required],
            country: ['India', Validators.required],
            postalCode: ['', Validators.required],
            region: ['', Validators.required],
            companyName: ['', Validators.required],
            cin: ['', Validators.required],
            registrationNumber: ['', Validators.required],
            registrationYear: ['', Validators.required],
            registratedAuthority: ['', Validators.required],
            longitude: ['', Validators.required],
            latitude: ['', Validators.required],

            accountNumber: ['', Validators.required],
            accountType: ['', Validators.required],
            bankName: ['', Validators.required],
            branchName: ['', Validators.required],
            holderName: ['', Validators.required],
            ifscCode: ['', Validators.required],
            taxNumber: ['', Validators.required],
            areaId: [''],
            vendorId: [''],
            vendorObjId: ['']
        })
    }

    clearScreen(oEvent) {
        this.newUserForm.reset();
        this.filevalid = false;
        this.filevalid1 = false;
        this.imgURL = "";
        this.profilePicId = "";
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
                    "companyName": filledData.companyName,
                    "cin": filledData.cin,
                    "registrationNumber": filledData.registrationNumber,
                    "registrationYear": filledData.registrationYear,
                    "registratedAuthority": filledData.registratedAuthority,
                    "ownerName": {
                        "title": filledData.title,
                        "firstName": filledData.firstname,
                        "lastName": filledData.lastname
                    },
                    "ownerAddress": {
                        "flatNumber": filledData.flatNumber,
                        "street": filledData.street,
                        "landMark": filledData.landMark,
                        "city": filledData.city,
                        "state": filledData.state,
                        "country": filledData.country,
                        "postalCode": filledData.postalCode,
                        "formattedAddress": "all the Above",
                    },
                    "phoneNumber": filledData.phone,
                    "email": filledData.email,
                    //"password": filledData.email,
                    "areaId": aId,
                    "formattedAddress": "all the Above",
                    "medias": medi,
                    "longitude": filledData.longitude,
                    "latitude": filledData.latitude,
                    "bankDetails": {
                        "accountNumber": filledData.accountNumber,
                        "accountType": filledData.accountType,
                        "holderName": filledData.holderName,
                        "ifscCode": filledData.ifscCode,
                        "bankName": filledData.bankName,
                        "branchName": filledData.branchName,
                        "taxNumber": filledData.taxNumber
                    },
                    "isActive": this.activeVendor,
                    "isVendor": this.Vendor,
                    "isRetailer": this.Retailer,
                };
                this.cds2.postVendor(this.cds2.tokenLogin, createData).subscribe(response => {
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
                    "companyName": filledData.companyName,
                    "cin": filledData.cin,
                    "registrationNumber": filledData.registrationNumber,
                    "registrationYear": filledData.registrationYear,
                    "registratedAuthority": filledData.registratedAuthority,
                    "ownerName": {
                        "title": filledData.title,
                        "firstName": filledData.firstname,
                        "lastName": filledData.lastname
                    },
                    "ownerAddress": {
                        "flatNumber": filledData.flatNumber,
                        "street": filledData.street,
                        "landMark": filledData.landMark,
                        "city": filledData.city,
                        "state": filledData.state,
                        "country": filledData.country,
                        "postalCode": filledData.postalCode,
                        "formattedAddress": "all the Above",
                    },
                    "phoneNumber": filledData.phone,
                    "email": filledData.email,
                    //"password": filledData.email,
                    "areaId": aId,
                    "formattedAddress": "all the Above",
                    "medias": medi,
                    "longitude": filledData.longitude,
                    "latitude": filledData.latitude,
                    "bankDetails": {
                        "accountNumber": filledData.accountNumber,
                        "accountType": filledData.accountType,
                        "holderName": filledData.holderName,
                        "ifscCode": filledData.ifscCode,
                        "bankName": filledData.bankName,
                        "branchName": filledData.branchName,
                        "taxNumber": filledData.taxNumber
                    },
                    "isActive": this.activeVendor,
                    "isVendor": this.Vendor,
                    "isRetailer": this.Retailer,
                };
                this.cds2.updateVendor(filledData.vendorObjId, this.cds2.tokenLogin, createData1).subscribe(response => {
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
    toggeleVendor(evt) {
        this.Vendor = evt.checked;
    }
    toggeleActive(evt) {
        this.activeVendor = evt.checked;
    }
    toggeleRetailer(evt) {
        this.Retailer = evt.checked;
    }
    bindDisplayValues(val) {
        this.newUserForm.patchValue({
            title: val.title,
            firstname: val.firstname,
            lastname: val.lastname,
            phone: val.ph,
            email: val.email,
            flatNumber: val.flatNumber,
            street: val.street,
            landMark: val.landMark,
            city: val.city,
            state: val.state,
            country: val.country,
            postalCode: val.postalCode,
            region: val.region,
            companyName: val.companyname,
            cin: val.cin,
            registrationNumber: val.registrationNumber,
            registrationYear: val.registrationYear,
            registratedAuthority: val.registratedAuthority,
            longitude: val.longitude,
            latitude: val.latitude,

            accountNumber: val.accountNumber,
            accountType: val.accountType,
            bankName: val.bankName,
            branchName: val.branchName,
            holderName: val.holderName,
            ifscCode: val.ifscCode,
            taxNumber: val.taxNumber,
            areaId: val.areaId,
            vendorId: val.vendorId,
            vendorObjId: val.vendorObjId
        })
    }
}



@Component({
    templateUrl: 'product-details.html',
})
export class ProductDetails implements OnInit {
    productForm: FormGroup;
    val: any;
    pftelpat = "^[6789]{1}[0-9]{9}$";
    filevalid: any;


    public imagePath;
    imgProductUrl: any;
    public message: string;
    region: any[];
    profilePicId: any;
    view: any;


    constructor(
        public dialogRefProduct: MatDialogRef<AddUser>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private cds2: CommonServiceService) { }

    ngOnInit() {
        this.view = false;
        // this.imgProduct = "";
        var data = this.dialogRefProduct.componentInstance.data.data1;

        this.nextProcess();
        // if (this.dialogRefProduct.componentInstance.data.ind !== 'create') {
        //     this.cds2.getMedia(this.cds2.tokenLogin, data.media[0]._id).subscribe(response => {
        //         this.imgProductUrl = response["path"];
        //         this.profilePicId = response["_id"];
        //     }, error => {
        //         this.snackBar.open(error.error.message, "", {
        //             duration: 2000,
        //         });
        //     });
        // }
    }
    nextProcess() {

        this.createForm();
        var data = this.dialogRefProduct.componentInstance.data.data1;
        this.bindDisplayValues(data);
        this.productForm.disable();
    }
    createForm() {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            code: ['', Validators.required],
            price: ['', Validators.required],
            capacity: ['', Validators.required],
            description: ['', Validators.required],
            vendorId: ['', Validators.required],
            activeProduct: ['', Validators.required]
        })
    }

    clearScreen(oEvent) {
        this.productForm.reset();
        this.filevalid = false;

        this.imgProductUrl = "";
        this.profilePicId = "";
    }
    createNewUser(oEvent) {
        if (this.productForm.valid && this.profilePicId != "") {

        } else {
            for (let name in this.productForm.controls) {
                if (this.productForm.controls[name].value == '' || this.productForm.controls[name].value == null) {
                    this.productForm.controls[name].markAsTouched();
                    this.snackBar.open("Please Enter All values", "", {
                        duration: 2000,
                    });
                }
                else
                    this.productForm.controls[name].setErrors(null);
            }
            if (this.profilePicId == "") {
                this.filevalid = true;
            } else {
                this.filevalid = false;
            }

        }
    }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;

        if(charCode > 31 && (charCode < 48 || charCode > 57)) 
            return false;
         else
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
            this.imgProductUrl = response["media"].path;
            this.profilePicId = response["media"]._id;
            this.filevalid = false;
        }, error => {
            this.snackBar.open(error.error.error.message, "", {
                duration: 2000,
            });
        });
    }
    toggeleEdit(evt) {
        this.view = evt.checked;
        if (this.view) {
            this.productForm.enable();
        } else {
            this.productForm.disable();
        }

    }
    Close(evt) {
        this.dialogRefProduct.close();
    }
    bindDisplayValues(val) {
        this.productForm.patchValue({

        })
    }
}

