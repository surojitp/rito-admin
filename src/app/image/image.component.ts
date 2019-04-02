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
    selector: 'image',
    styleUrls: ['./image.component.css'],
    templateUrl: './image.component.html',
})
// class Select
export class ImageComponent implements OnInit {
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
        this.data = [];
        this.pagetitle = 'Add image';
        this.admintoken = localStorage.getItem('admintoken');
        this._appservice.getAllImage().subscribe((Response) => {
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
    addData() {
        this.pagetitle = 'Add image';
        this.uploadfile = '';
        this.privewfile = '';
        this.item = '';
    }
    saveData() {
        var flag = 0, errorMessage;
        var img_val = /\.(jpe?g|png|gif|jpg|JPE?G|PNG|GIF|JPG)$/i;
        if (this.uploadfile == '' || this.uploadfile == undefined || this.uploadfile == null) {
            errorMessage = 'Please upload image';
            flag = 1;
            this._message.showError(errorMessage);
            return false;
        } else if (!img_val.test(this.uploadfile.name)) {
            errorMessage = 'Please enter valid image file';
            flag = 1;
            this._message.showError(errorMessage);
            return false;
        } else {
            this._appservice.addImage(this.uploadfile)
                .subscribe((Response) => {
                    if (Response.STATUSCODE == 4002) {
                        this._message.showError(Response.response_message);
                        localStorage.clear();
                        location.reload();
                    } else {
                        if (Response.success) {
                            this._message.showSuccess(Response.message);
                            this.popupDiv = false;
                            this.ngOnInit();
                        } else {
                            this._message.showWarning(Response.message);
                        }
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
        }
    }
    deleteData(item) {
        if (confirm("Are you sure want to delete this data?")) {
            this._appservice.deleteImage(item).subscribe((Response) => {
                if (Response.success) {
                    this._message.showSuccess(Response.message);
                    this.ngOnInit();
                } else {
                    this._message.showWarning(Response.message);
                }
            }, (Error) => {
                console.log(Error)
            })
        }
    }
    clear() {
        this.ngOnInit()
    }
}