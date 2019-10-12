import { Injectable, Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService implements OnInit {

  constructor(private http: HttpClient) { }
  tokenLogin: any;
  currentAdminDetail: any;
  areaData: any;
  url = "http://localhost:3000/";

  ngOnInit() { }

  /*######################################### EDIA DETAILS STARTS ##################################### */
  //post media files
  postMedia(body) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': "Bearer" + " " + token
    //   })
    // };
    return this.http.get(this.url + "media/",body);
  }

  //get media location
  getMedia(token, mediaId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + token
      })
    };
    return this.http.get(this.url + "media/" + mediaId, httpOptions);
  }

  /*######################################### MEDIA DETAILS ENDS ##################################### */
  /*######################################### ADMIN DETAILS STARTS ##################################### */
  //Login details
  getLogin(data) {
    return this.http.post(this.url + "admin/login/", data);
  }

  //get current admin details
  getCurentAdminDetails(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + token
      })
    };
    return this.http.get(this.url + "admin/current-admin", httpOptions);
  }

  //get all admins details
  getAllAdminDetails(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + token
      })
    };
    return this.http.get(this.url + "admin", httpOptions);
  }

  /*######################################### ADMIN DETAILS ENDS ##################################### */
  /*######################################### AREA DETAILS STARTS ##################################### */
  //get area detail
  getAllAraeDetails(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + token
      })
    };
    return this.http.get(this.url + "area/", httpOptions);
  }

  //get area detail
  postAreaDetails(body) {
    return this.http.post(this.url + "area/", body);
  }

  //delete area details
  deleteAreaDetails(areaCode, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + token
      })
    };
    return this.http.delete(this.url + "area/" + areaCode);
  }

  //update area detail
  updateAreaDetails(areaCode, body, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + token
      })
    };
    return this.http.patch(this.url + "area/" + areaCode, body);
  }

  /*######################################### AREA DETAILS ENDS ##################################### */

}

