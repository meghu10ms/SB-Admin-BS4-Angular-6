import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonServiceService } from '../../common-service.service';
export interface DialogData {
  data1: any;
  ind: any;
}

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  animations: [routerTransition()]
})
export class OfferComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cds: CommonServiceService) { }
  visible: any;
  OfferCollection: any[];
  ngOnInit() {

    this.nextProcess();
  }
  nextProcess() {
    this.visible = true;
    this.cds.getAllOffer(this.cds.tokenLogin).subscribe(response => {
      this.visible = false;

      this.OfferCollection = this.getOffers(response["offers"]);
    }, error => {
      this.visible = false;
      this.snackBar.open(error.error.message, "", {
        duration: 2000,
      });
    })
  }
  getOffers(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      formatJson = {
        "name": val[i].offername,
        "description": val[i].offerDescription,
        "couponCode": val[i].couponCode,
        "type": val[i].offerType,
        //"isActive": val[i].isActive,
        "fromDate": val[i].validFrom,
        "validDuration": val[i].validDuration,
        "percentage": val[i].percentage,
        "amount": val[i].amount,
        "customers": val[i].offer,
        "offerId": val[i]._id
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }
  newAds() {
    const dialogRef = this.dialog.open(ViewOffer, {
      width: '95%',
      height: '70%',
      data: { ind: "create", data1: "" }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.nextProcess();
    });
  }

  editAds(val) {
    const dialogRef = this.dialog.open(ViewOffer, {
      width: '95%',
      height: '70%',
      data: { ind: "edit", data1: val }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.nextProcess();
    });
  }
  deleteAds(val) {
    this.cds.deleteAds(val.id, this.cds.tokenLogin).subscribe(response => {
      this.nextProcess();
    }, error => {
      this.snackBar.open(error.error.error.message, "", {
        duration: 2000,
      });
    });
  }

}


@Component({
  templateUrl: 'view-offer.html',
})
export class ViewOffer implements OnInit {
  newUserForm: FormGroup;
  // imgProductUrl: any;
  // imgProductUrl1: any;
  // Active: boolean;
  // profilePicId: any;
  // profilePicId1: any;
  // filevalid: any;
  offerType: any[];



  constructor(
    public dialogRef: MatDialogRef<ViewOffer>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    private cds2: CommonServiceService) { }

  ngOnInit() {
    // this.Active = false;
    this.offerType = [{ "type": "PRTG" }, { "type": "AMT" }];
    var data = this.dialogRef.componentInstance.data.data1;
    this.createForm();
    if (this.dialogRef.componentInstance.data.ind == 'edit') {
      this.bindDisplayValues(data);
      // this.Active = data.isActive;
    } else {
      // this.Active = false;
      // this.imgProductUrl = "";
      // this.profilePicId = "";
    }
  }
  createForm() {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      couponCode: ['', Validators.required],
      percentage: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', Validators.required],
      customer: ['', Validators.required],
      validDuration: ['', Validators.required],
      fromDate: ['', Validators.required],

      offerId: [''],

    })
  }

  CancelPage() {
    this.dialogRef.close();
  }

  // toggeleActive(evt) {
  //   this.Active = evt.checked;
  // }
  // preview(files) {
  //   if (files.length === 0)
  //     return;

  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.snackBar.open("File Type Not supporting upload imgage only", "", {
  //       duration: 2000,
  //     });
  //     return;
  //   }
  //   if (files[0].size > 2000000) {
  //     this.snackBar.open("File size excceds 2MB", "", {
  //       duration: 2000,
  //     });
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', files[0]);
  //   formData.append('name', 'ads');
  //   this.cds2.postMedia(formData).subscribe(response => {
  //     this.imgProductUrl = response["media"].path;
  //     this.profilePicId = response["media"]._id;
  //     this.filevalid = false;
  //   }, error => {
  //     this.snackBar.open(error.error.error.message, "", {
  //       duration: 2000,
  //     });
  //   });
  // }
  // preview1(files) {
  //   if (files.length === 0)
  //     return;

  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.snackBar.open("File Type Not supporting upload imgage only", "", {
  //       duration: 2000,
  //     });
  //     return;
  //   }
  //   if (files[0].size > 2000000) {
  //     this.snackBar.open("File size excceds 2MB", "", {
  //       duration: 2000,
  //     });
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', files[0]);
  //   formData.append('name', 'offer');
  //   this.cds2.postMedia(formData).subscribe(response => {
  //     this.imgProductUrl1 = response["media"].path;
  //     this.profilePicId1 = response["media"]._id;

  //   }, error => {
  //     this.snackBar.open(error.error.error.message, "", {
  //       duration: 2000,
  //     });
  //   });
  // }

  createAds() {
    if (this.newUserForm.valid) {
      var medi = [];
      // medi.push(this.profilePicId);
      var filledData = this.newUserForm.value;
      var createData = {
        "name": filledData.name,
        "description": filledData.description,
        "url": filledData.url,
        //"offer": filledData.offer,
        "fromDate": filledData.fromDate,
        "toDate": filledData.toDate,
        "interval": filledData.interval,
        "type": filledData.type,
        "isActive": filledData.isActive,
        "medias": medi
      };
      if (this.dialogRef.componentInstance.data.ind == 'create') {

        this.cds2.postOffer(this.cds2.tokenLogin, createData).subscribe(response => {
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

        this.cds2.updateOffer(filledData.offerId, this.cds2.tokenLogin, createData).subscribe(response => {
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
      // if (this.profilePicId == "") {
      //   this.filevalid = false;
      // } else {
      //   this.filevalid = true;
      // }
    }
  }
  bindDisplayValues(val) {
    // this.imgProductUrl = val.path;
    // this.profilePicId = val.id;
    this.newUserForm.patchValue({
      name: val.name,
      description: val.description,
      couponCode: val.couponCode,
      percentage: val.percentage,
      type: val.type,
      offer: val.offer,
      amount: val.amount,
      customer: val.customer,
      validDuration: val.amount,
      fromDate: val.customer,
      offerId: val.offerId

    });
  }
}