import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { CONFIG } from '../../../config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  constructor(private _http: Http, ) { }
  getToken() {
    return localStorage.getItem('admintoken');
  }
  authHeader(headers: Headers) {
    headers.append('x-access-token', this.getToken());
  }
  private _errorHandler(error: Response) {
    return Observable.throw(error.json() || 'Server Error');
  }

  getCountries() {
    const headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    return this._http.get(
      CONFIG.API_ENDPOINT + 'countries',
      { headers: headers }
    )
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  doLogin(loginData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log(CONFIG.API_ENDPOINT_RITO);
    const URL = CONFIG.API_ENDPOINT_RITO + 'adminLogin';
    return this._http.post(URL, loginData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  updatePassword(updateData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    console.log('options', options);
    const URL = CONFIG.API_ENDPOINT + 'adminChangePassword';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  forgotpassLinksend(forgotpassadmin) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'forgotpassLinksend';
    return this._http.post(URL, forgotpassadmin, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  forgotPassword(forgotPasswordData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'forgotPassword';
    return this._http.post(URL, forgotPasswordData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // All print list
  getAllPrint() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'listPrint';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  // Edit print
  editPrint(updateData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'editPrint';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Content list
  getAllContent(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'listContent';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Content Details
  getDetailsContent(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'detailsContent';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Edit content
  editContent(updateData, updateFile) {
    const formData: FormData = new FormData();
    // tslint:disable-next-line:forin
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append('image', updateFile);
    const headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'editContent';
    console.log('formData', formData);
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Service list
  getAllSerice() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'listService';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Service Details
  getDetailService(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'detailsService';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Edit service
  editService(updateData, updateFile) {
    const formData: FormData = new FormData();
    // tslint:disable-next-line:forin
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append('image', updateFile);
    const headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'editService';
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Header list
  getAllHeader() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'listHeader';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Header Details
  getDetailsHeader(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'detailsHeader';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Edit Header
  editHeader(updateData, updateFile) {
    const formData: FormData = new FormData();
    // tslint:disable-next-line:forin
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append('image', updateFile);
    const headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'editHeader';
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Footer list
  getAllFooter() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'listFooter';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Footer Details
  getDetailsFooter(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'detailsFooter';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Edit Footer
  editFooter(updateData, updateFile) {
    const formData: FormData = new FormData();
    // tslint:disable-next-line:forin
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append('image', updateFile);
    const headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'editFooter';
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Gallery list
  getAllGallery() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'listGallery';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Gallery Details
  getDetailsGallery(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'detailsGallery';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Gallery Edit
  editGallery(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'editGallery';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // All User list
  getAllUser(data) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT_RITO + 'listUser';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // change status of user
  changeStatusUser(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'changestatususer';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // All Print card apply list
  getAllPrintCardApply() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'listPrintCardApply';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Delete Print Card Apply
  deletePrintCardApply(updateData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'printcardapplydelete';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // All Pharmacy list
  getAllPramacy(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'pharmacylist';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  // Add Pharmacy
  addPharmacy(updateData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'pharmacyadd';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  // Edit Pharmacy
  editPharmacy(updateData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'pharmacyedit';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  // Delete Pharmacy
  deletePharmacy(updateData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'pharmacydelete';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  // Setting list
  getAllSetting() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'settinglist';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  // Setting Details
  getDetailsSetting(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'settingdetails';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  // Edit setting
  editSetting(updateData, updateFile) {
    const formData: FormData = new FormData();
    // tslint:disable-next-line:forin
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append('image', updateFile);
    const headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'editsetting';
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Column list
  getAllColumn() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'listcolumn';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  // Column Details
  getDetailsColumn(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'detailscolumn';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Edit Column
  editColumn(updateData, updateFile) {
    const formData: FormData = new FormData();
    // tslint:disable-next-line:forin
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append('image', updateFile);
    const headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'editcolumn';
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  addImageInGallery(updateData, updateFile) {
    const formData: FormData = new FormData();
    // tslint:disable-next-line:forin
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append('image', updateFile);
    const headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'addimageingallery';
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  removeImageInGallery(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'removeimageingallery';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  addImage(updateFile) {
    const formData: FormData = new FormData();
    formData.append('image', updateFile);
    const headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'addimage';
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  // Image list
  getAllImage() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'listimage';
    console.log('URL', URL);
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  deleteImage(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    const options = new RequestOptions({ headers: headers });
    const URL = CONFIG.API_ENDPOINT + 'removeimage';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
}

