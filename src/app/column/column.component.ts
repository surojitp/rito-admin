import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { CONFIG } from "../../../config";
import { HighlightPipe } from '../highlight.pipe';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';


@Component({
    selector: 'column',
    styleUrls: ['./column.component.css'],
    templateUrl: './column.component.html',
})
// class Select
export class ColumnComponent implements OnInit {
    edit: boolean;
    data: any;
    admintoken: any;
    pagetitle: any;
    popupDiv: any;
    item: any = {};
    ckeConfig: any;
    showFiles: any;
    arr = [];
    uploadfile: any;
    privewfile: any;
    file2: any;
    urls = [];
    image_type = ['image/gif', 'image/jpeg', 'image/png', 'image/gif'];
    onSelectFile(event) {
        this.uploadfile = event.target.files[0];
        if (this.image_type.includes(this.uploadfile.type)) {
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = (event) => {
                    this.privewfile = event.target['result'];
                }
                reader.readAsDataURL(event.target.files[0]);

            }
        } else {
            this._message.showError('Please enter valid image file');
            return false;
        }

    }

    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
    ) { }

    ngOnInit(): void {
        this.data = '';
        this.admintoken = localStorage.getItem('admintoken');
        this._appservice.getAllColumn().subscribe((Response) => {
            if (Response.STATUSCODE == 4002) {
                this._message.showError(Response.message);
                localStorage.clear();
                location.reload();
            } else {
                if (Response.success) {
                    var result = Response.response;
                    this.data = result;
                } else {
                    this._message.showWarning(Response.message);
                }
            }
        }, (Error) => {
        })
    }
    getDetails(str: any) {
        this.edit = true;
        this.popupDiv = true;
        this.pagetitle = 'Edit Column Content';

        this._appservice.getDetailsColumn(str).subscribe((Response) => {
            if (Response.STATUSCODE == 4002) {
                this._message.showError(Response.response_message);
                localStorage.clear();
                location.reload();
            } else {
                if (Response.success) {
                    var result = Response.response;
                    this.item = result;
                } else {
                    this._message.showWarning(Response.message);
                }
            }
        }, (Error) => {
        })
    }
    saveData() {
        var flag = 0, errorMessage;
        var img_val = /\.(jpe?g|png|gif|jpg|JPE?G|PNG|GIF|JPG)$/i;
        if (this.edit == true && flag == 0) {
            if ((this.item.value_type == 'img' || this.item.value_type == 'both') && (this.item.uploadimage != "" && this.item.uploadimage != undefined && this.item.uploadimage != null) && (!img_val.test(this.uploadfile.name))) {
                errorMessage = 'Please enter valid image file';
                this.item.image = this.privewfile;
                this.privewfile = false;
                flag = 1;
                this._message.showError(errorMessage)
                return false;
            } else {
                if (this.item.textimonial.length > 0) {
                    this.item.textimonial_id = this.item.textimonial[0]._id;
                    this.item.textimonial_title = this.item.textimonial[0].title;
                    this.item.textimonial_description = this.item.textimonial[0].description;
                }
                console.log('this.item',this);
                this._appservice.editColumn(this.item, this.uploadfile)
                    .subscribe((Response) => {
                        if (Response.STATUSCODE == 4002) {
                            this._message.showError(Response.response_message);
                            localStorage.clear();
                            location.reload();
                        } else {
                            if (Response.success) {
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
    clear() {
        this.ngOnInit()
    }
}
