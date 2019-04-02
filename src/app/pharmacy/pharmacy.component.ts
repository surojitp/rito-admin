import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { CONFIG } from "../../../config";
import { HighlightPipe } from '../highlight.pipe';
import { DatepickerOptions } from 'ng2-datepicker';


@Component({
    selector: 'pharmacy',
    styleUrls: ['./pharmacy.component.css'],
    templateUrl: './pharmacy.component.html',
})
// class Select
export class PharmacyComponent implements OnInit {
    edit: boolean;
    data: any;
    admintoken: any;
    pagetitle: any;
    popupDiv: any;
    item: any = {};
    search_zipcode: any;

    options: DatepickerOptions = {
        displayFormat: 'YYYY-MM-DD',
        barTitleFormat: 'MMMM YYYY',
        dayNamesFormat: 'dd',
        barTitleIfEmpty: 'Click to select a date',
        placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    };
    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.admintoken = localStorage.getItem('admintoken');
    }
    listpharmacy() {
        if (this.search_zipcode == undefined || this.search_zipcode == null || this.search_zipcode == '') {
            this._message.showError('Please enter zipcode')
        } else {
            this.item.value = this.search_zipcode.trim();
            this._appservice.getAllPramacy(this.item).subscribe((Response) => {
                if (Response.STATUSCODE == 4002) {
                    this._message.showError(Response.message);
                    localStorage.clear();
                    location.reload();
                } else {
                    if (Response.success) {
                        var result = Response.response.pharmacyList;
                        this.data = result;
                    } else {
                        this._message.showWarning(Response.message);
                    }
                }
            }, (Error) => {
            })
        }
    }
    getDetails(str: any) {
        this.edit = true;
        this.popupDiv = true;
        this.pagetitle = 'Edit Pharmacy';
        this.item = str;
    }
    addData(){
        this.edit = false;
        this.item={};
    }
    saveData() {
        var flag = 0, errorMessage;
        if (this.item.pharmacyname == '' || this.item.pharmacyname == undefined) {
            errorMessage = 'Please enter pharmacy name';
            flag = 1;
            this._message.showError(errorMessage)
            return false;
        } else if (this.item.address1 == '' || this.item.address1 == undefined) {
            errorMessage = 'Please enter address';
            flag = 1;
            this._message.showError(errorMessage)
            return false;
        } else if (this.item.city == '' || this.item.city == undefined) {
            errorMessage = 'Please enter city';
            flag = 1;
            this._message.showError(errorMessage)
            return false;
        } else if (this.item.state == '' || this.item.state == undefined) {
            errorMessage = 'Please enter state';
            flag = 1;
            this._message.showError(errorMessage)
            return false;
        } else if (this.item.zip == '' || this.item.zip == undefined) {
            errorMessage = 'Please enter zip';
            flag = 1;
            this._message.showError(errorMessage)
            return false;
        } else {
            if (this.edit) {
                this._appservice.editPharmacy(this.item)
                    .subscribe((Response) => {
                        if (Response.STATUSCODE == 4002) {
                            this._message.showError(Response.message);
                            localStorage.clear();
                            location.reload();
                        } else {
                            if (Response.success) {
                                this._message.showSuccess(Response.message);
                                this.search_zipcode = this.item.zip;
                                this.listpharmacy();
                                this.popupDiv = false;
                                this.edit = false;
                            } else {
                                this._message.showWarning(Response.message);
                            }
                        }

                    }, (Error) => {
                        this._message.showError(Error.message)
                    })
            } else {
                this._appservice.addPharmacy(this.item)
                    .subscribe((Response) => {
                        if (Response.STATUSCODE == 4002) {
                            this._message.showError(Response.message);
                            localStorage.clear();
                            location.reload();
                        } else {
                            if (Response.success) {
                                this.search_zipcode = this.item.zip;
                                this.listpharmacy();
                                this._message.showSuccess(Response.message);
                                this.popupDiv = false;
                            } else {
                                this._message.showWarning(Response.message);
                            }
                        }

                    }, (Error) => {
                        this._message.showError(Error.message)
                    })
            }
        }
    }
    deleteData(item) {
        if (confirm("Are you sure want to delete this pharmacy?")) {
            this._appservice.deletePharmacy(item).subscribe((Response) => {
                if (Response.success) {
                    this._message.showSuccess(Response.message);
                    this.listpharmacy();
                } else {
                    this._message.showWarning(Response.message);
                }
            }, (Error) => {
                console.log(Error)
            })
        }
    }
}
