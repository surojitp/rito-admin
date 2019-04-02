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
    selector: 'footercontent',
    styleUrls: ['./footercontent.component.css'],
    templateUrl: './footercontent.component.html',
})
// class Select
export class FootercontentComponent implements OnInit {
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
        this._appservice.getAllFooter().subscribe((Response) => {
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
        this.pagetitle = 'Edit Footer Content';
        this._appservice.getDetailsFooter(str).subscribe((Response) => {
            if (Response.STATUSCODE == 4002) {
                this._message.showError(Response.message);
                localStorage.clear();
                location.reload();
            } else {
                if (Response.success) {
                    var result = Response.response;
                    this.item = str;
                    this.item.image = result.image;
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
        var url_val = /^(ftp|http|https):\/\/[^ "]+$/;
        if (this.edit == true && flag == 0) {
            if (this.item.title == '' || this.item.title == undefined) {
                errorMessage = 'Please enter title';
                flag = 1;
                this._message.showError(errorMessage);
                return false;
            } else if ((this.item.uploadimage != "" && this.item.uploadimage != undefined && this.item.uploadimage != null) && (!img_val.test(this.uploadfile.name))) {
                errorMessage = 'Please enter valid image file';
                this.item.image = this.privewfile;
                this.privewfile = false;
                flag = 1;
                this._message.showError(errorMessage)
                return false;
            } else {
                this._appservice.editFooter(this.item, this.uploadfile)
                    .subscribe((Response) => {
                        if (Response.success) {
                            this._message.showSuccess(Response.message);
                            this.popupDiv = false;
                            this.privewfile = false;
                        } else {
                            this._message.showWarning(Response.message);
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
