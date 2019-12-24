import { Injectable, Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CommonServiceService implements OnInit {

  constructor(private http: HttpClient) { }
  tokenLogin: any;
  currentAdminDetail: any;
  areaData: any;
  filePath: any;
  //url = "http://139.59.82.247/";
  url = environment.apiUrl;
  ngOnInit() { }

  getFilePath(id) {
    let path = "";
    path = this.url + "media/" + id + "/download";
    return path;
  }
  //get Token
  getTokenAccess(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + token
      })
    }
    return httpOptions;
  }

  /*######################################### EDIA DETAILS STARTS ##################################### */

  //post media files
  postMedia(body) {
    return this.http.post(this.url + "media/", body);
  }

  //get media 
  getMedia(token, mediaId) {
    return this.http.get(this.url + "media/" + mediaId, this.getTokenAccess(token));
  }

  //delete media 
  deleteMedia(mediaId, token) {
    return this.http.delete(this.url + "media/" + mediaId, this.getTokenAccess(token));
  }

  /*######################################### MEDIA DETAILS ENDS ##################################### */
  /*######################################### ADMIN DETAILS STARTS ##################################### */
  //Login details
  getLogin(data) {
    return this.http.post(this.url + "admin/login/", data);
  }

  //Forgot Password
  forgotPassword(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.url + "admin/forgot-password/", body, httpOptions);
  }

  //Change Password
  changePassword(token, body) {

    return this.http.post(this.url + "admin/change-password/", body, this.getTokenAccess(token));
  }
  //get current admin details
  getCurentAdminDetails(token) {

    return this.http.get(this.url + "admin/current-admin", this.getTokenAccess(token));
  }

  //get all admins details
  getAllAdminDetails(token) {

    return this.http.get(this.url + "admin", this.getTokenAccess(token));
  }

  //create admin details
  postAreaAdmin(token, body) {

    return this.http.post(this.url + "admin/", body, this.getTokenAccess(token));
  }

  //update admin details
  updateAreaAdmin(adminid, token, body) {

    return this.http.patch(this.url + "admin/" + adminid, body, this.getTokenAccess(token));
  }

  //delete admin details
  deleteAreaAdmin(token, adminid) {

    return this.http.delete(this.url + "admin/" + adminid, this.getTokenAccess(token));
  }

  /*######################################### ADMIN DETAILS ENDS ##################################### */
  /*######################################### AREA DETAILS STARTS ##################################### */
  //get area detail
  getAllAraeDetails(token) {

    return this.http.get(this.url + "area/", this.getTokenAccess(token));
  }

  //get area detail
  postAreaDetails(body, token) {
    return this.http.post(this.url + "area/", body, this.getTokenAccess(token));
  }

  //delete area details
  deleteAreaDetails(areaCode, token) {

    return this.http.delete(this.url + "area/" + areaCode, this.getTokenAccess(token));
  }

  //update area detail
  updateAreaDetails(areaCode, body, token) {

    return this.http.patch(this.url + "area/" + areaCode, body, this.getTokenAccess(token));
  }

  /*######################################### AREA DETAILS ENDS ##################################### */
  /*######################################### VENDOR DETAILS STARTS ##################################### */
  //create vendor
  postVendor(token, body) {

    return this.http.post(this.url + "vendor/", body, this.getTokenAccess(token));
  }
  //get all Vendor details
  getAllVendorDetails(token) {

    return this.http.get(this.url + "vendor/", this.getTokenAccess(token));
  }

  //update Vendor details
  updateVendor(vendorid, token, body) {

    return this.http.patch(this.url + "vendor/" + vendorid, body, this.getTokenAccess(token));
  }

  //delete Vendor details
  deleteVendor(vendorid, token) {

    return this.http.delete(this.url + "vendor/" + vendorid, this.getTokenAccess(token));
  }
  /*######################################### VENDOR DETAILS ENDS ##################################### */
  /*######################################### Product DETAILS STARTS ##################################### */
  //create product
  postProduct(token, body) {

    return this.http.post(this.url + "product/", body, this.getTokenAccess(token));
  }

  //get product
  getProduct(token, vId) {

    return this.http.get(this.url + "product/vendor/" + vId, this.getTokenAccess(token));
  }

  //update product details
  updateProduct(productid, token, body) {

    return this.http.patch(this.url + "product/" + productid, body, this.getTokenAccess(token));
  }

  //delete product details
  deleteProduct(productid, token) {

    return this.http.delete(this.url + "product/" + productid, this.getTokenAccess(token));
  }
  /*######################################### VENDOR DETAILS ENDS ##################################### */
  /*######################################### DELIVARY PARTNER STARTS ##################################### */
  //create Delivary Partner
  postDelivaryPartner(token, body) {

    return this.http.post(this.url + "delivery-partner/", body, this.getTokenAccess(token));
  }
  //get all Delivary Partner
  getAllDelivaryPartnerDetails(token) {

    return this.http.get(this.url + "delivery-partner/", this.getTokenAccess(token));
  }

  //update Delivary Partner
  updateDelivaryPartner(vendorid, token, body) {

    return this.http.patch(this.url + "delivery-partner/" + vendorid, body, this.getTokenAccess(token));
  }

  //delete Delivary Partner
  deleteDelivaryPartner(vendorid, token) {

    return this.http.delete(this.url + "delivery-partner/" + vendorid, this.getTokenAccess(token));
  }
  /*######################################### Delivary Partner DETAILS ENDS ##################################### */
  /*######################################### Ads details starts ################################################ */
  //get all Ads
  getAllAds(token) {

    return this.http.get(this.url + "ads/search/", this.getTokenAccess(token));
  }

  //delete  Ads
  deleteAds(pId, token) {

    return this.http.delete(this.url + "ads/" + pId, this.getTokenAccess(token));
  }

  //update Ads
  updateAds(adsId, token, body) {

    return this.http.patch(this.url + "ads/" + adsId, body, this.getTokenAccess(token));
  }

  //update Ads
  postAds(token, body) {

    return this.http.post(this.url + "ads/", body, this.getTokenAccess(token));
  }
  /*######################################### Delivary Partner DETAILS ENDS ##################################### */
  /*######################################### Ads details starts ################################################ */
  //get all Ads
  getAllOffer(token) {

    return this.http.get(this.url + "offer/search/", this.getTokenAccess(token));
  }

  //delete all Ads
  deleteOffer(pId, token) {

    return this.http.delete(this.url + "offer/" + pId, this.getTokenAccess(token));
  }

  //update Ads
  updateOffer(adsId, token, body) {

    return this.http.patch(this.url + "offer/" + adsId, body, this.getTokenAccess(token));
  }

  //update Ads
  postOffer(token, body) {

    return this.http.post(this.url + "offer/", body, this.getTokenAccess(token));
  }
  /*######################################### Delivary Partner DETAILS ENDS ##################################### */
  /*######################################### Customers DETAILS Starts ##################################### */
  //get all Ads
  getAllCustomers(token) {

    return this.http.get(this.url + "customer/admin/search/", this.getTokenAccess(token));
  }
  /*######################################### Customers DETAILS Ends ######################################## */
  /*######################################### Delivery Charges starts ################################################ */
  //get all Delivery Charges
  getAllDelCharges(token) {

    return this.http.get(this.url + "delivery-charge/search", this.getTokenAccess(token));
  }

  //delete all Delivery Charges
  deleteDelCharges(pId, token) {

    return this.http.delete(this.url + "delivery-charge/" + pId, this.getTokenAccess(token));
  }

  //update Delivery Charges
  updateDelCharges(adsId, token, body) {

    return this.http.patch(this.url + "delivery-charge/" + adsId, body, this.getTokenAccess(token));
  }

  //update Delivery Charges
  postDelCharges(token, body) {

    return this.http.post(this.url + "delivery-charge/", body, this.getTokenAccess(token));
  }
  /*######################################### Delivery Cgharges DETAILS ENDS ##################################### */
  /*######################################### Delivery Commission starts ################################################ */
  //get all Delivery Commission
  getAllDelCommission(token) {

    return this.http.get(this.url + "delivery-commission/search", this.getTokenAccess(token));
  }

  //delete all Delivery Commission
  deleteDelCommission(pId, token) {

    return this.http.delete(this.url + "delivery-commission/" + pId, this.getTokenAccess(token));
  }

  //update Delivery Commission
  updateDelCommission(adsId, token, body) {

    return this.http.patch(this.url + "delivery-commission/" + adsId, body, this.getTokenAccess(token));
  }

  //update Delivery Commission
  postDelCommission(token, body) {

    return this.http.post(this.url + "delivery-commission/", body, this.getTokenAccess(token));
  }
  /*######################################### Delivery Commission DETAILS ENDS ##################################### */
  /*######################################### Dispenser starts ################################################ */
  //get all Dispenser
  getAllDispenser(token) {

    return this.http.get(this.url + "dispenser/", this.getTokenAccess(token));
  }

  //delete Dispenser
  deleteDispenser(pId, token) {

    return this.http.delete(this.url + "dispenser/" + pId, this.getTokenAccess(token));
  }

  //update Dispenser
  updateDispenser(adsId, token, body) {

    return this.http.patch(this.url + "dispenser/" + adsId, body, this.getTokenAccess(token));
  }

  //update Dispenser
  postDispenser(token, body) {

    return this.http.post(this.url + "dispenser/", body, this.getTokenAccess(token));
  }
  /*######################################### Delivery Commission DETAILS ENDS ##################################### */
  /*######################################### Tax starts ################################################ */
  //get all Tax
  getAllTax(token) {

    return this.http.get(this.url + "tax/", this.getTokenAccess(token));
  }

  //delete Tax
  deleteTax(pId, token) {

    return this.http.delete(this.url + "tax/" + pId, this.getTokenAccess(token));
  }

  //update Tax
  updateTax(adsId, token, body) {

    return this.http.patch(this.url + "tax/" + adsId, body, this.getTokenAccess(token));
  }

  //update Tax
  postTax(token, body) {

    return this.http.post(this.url + "tax/", body, this.getTokenAccess(token));
  }
  /*######################################### Delivery Commission DETAILS ENDS ##################################### */

}

