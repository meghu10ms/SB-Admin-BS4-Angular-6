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
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
  animations: [routerTransition()]
})
export class AdsComponent implements OnInit {
  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cds: CommonServiceService) { }
  visible: any;
  AdsCollection: any[];
  ngOnInit() {

    this.nextProcess();
  }
  nextProcess() {
    this.visible = true;
    this.cds.getAllAds(this.cds.tokenLogin).subscribe(response => {
      this.visible = false;

      this.AdsCollection = this.getAds(response["ads"]);
    }, error => {
      this.visible = false;
      this.snackBar.open(error.error.message, "", {
        duration: 2000,
      });
    })
  }
  getAds(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      formatJson = {
        "name": val[i].name,
        "description": val[i].description,
        "interval": val[i].interval,
        "type": val[i].type,
        "isActive": val[i].isActive,
        "fromDate": val[i].fromDate,
        "toDate": val[i].toDate,
        "url": val[i].url,
        "offer": val[i].offer,
        "adsId": val[i]._id,
        "path": (val[i].medias.path ? val[i].medias.path : "../assets/images/avtar.png"),
        "id": (val[i].medias._id ? val[i].medias._id : "")
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }
  newAds() {
    const dialogRef = this.dialog.open(ViewAd, {
      width: '95%',
      height: '80%',
      data: { ind: "create", data1: "" }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.nextProcess();
    });
  }

  editAds(val) {
    const dialogRef = this.dialog.open(ViewAd, {
      width: '95%',
      height: '80%',
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
  templateUrl: 'view-ad.html',
})
export class ViewAd implements OnInit {
  newUserForm: FormGroup;
  imgProductUrl: any;
  imgProductUrl1: any;
  Active: boolean;
  profilePicId: any;
  profilePicId1: any;
  filevalid: any;
  adsType: any[];



  constructor(
    public dialogRef: MatDialogRef<ViewAd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    private cds2: CommonServiceService) { }

  ngOnInit() {
    this.Active = false;
    this.adsType = [{ "type": "BANNER" }, { "type": "TUMBLR" }];
    var data = this.dialogRef.componentInstance.data.data1;
    this.createForm();
    if (this.dialogRef.componentInstance.data.ind == 'edit') {
      this.bindDisplayValues(data);
      this.Active = data.isActive;
    } else {
      this.Active = false;
      this.imgProductUrl = "";
      this.profilePicId = "";
    }
  }
  createForm() {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      interval: ['', Validators.required],
      type: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      adsId: [''],
      offer: ['']
    })
  }

  CancelPage() {
    this.dialogRef.close();
  }

  toggeleActive(evt) {
    this.Active = evt.checked;
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
    formData.append('name', 'ads');
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
  preview1(files) {
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
    formData.append('name', 'offer');
    this.cds2.postMedia(formData).subscribe(response => {
      this.imgProductUrl1 = response["media"].path;
      this.profilePicId1 = response["media"]._id;

    }, error => {
      this.snackBar.open(error.error.error.message, "", {
        duration: 2000,
      });
    });
  }

  createAds() {
    if (this.newUserForm.valid && this.profilePicId != "") {
      var medi = [];
      medi.push(this.profilePicId);
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

        this.cds2.postAds(this.cds2.tokenLogin, createData).subscribe(response => {
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

        this.cds2.updateAds(filledData.adsId, this.cds2.tokenLogin, createData).subscribe(response => {
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
        this.filevalid = false;
      } else {
        this.filevalid = true;
      }
    }
  }
  bindDisplayValues(val) {
    this.imgProductUrl = val.path;
    this.profilePicId = val.id;
    this.newUserForm.patchValue({
      name: val.name,
      description: val.description,
      url: val.url,
      interval: val.interval,
      type: val.type,
      offer: val.offer,
      fromDate: val.fromDate,
      toDate: val.toDate,
      adsId: val.adsId
    });
  }
}


