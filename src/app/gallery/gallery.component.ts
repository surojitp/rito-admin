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
    selector: 'gallery.',
    styleUrls: ['./gallery.component.css'],
    templateUrl: './gallery.component.html',
})
// class Select
export class GalleryComponent implements OnInit {
    edit: boolean;
    addimg: boolean;
    view: boolean;
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
        this._appservice.getAllGallery().subscribe((Response) => {
            var result = Response.response;
            this.data = result;

        }, (Error) => {
        })

    }
    getDetails(str: any) {
        this.addimg = false;
        this.edit = true;
        this.pagetitle = 'Edit Gallery Details';
        this.popupDiv = true;

        this.item = { _id: str }
        this._appservice.getDetailsGallery(this.item).subscribe((Response) => {
            var result = Response.response;
            this.item = result;
        }, (Error) => {
        })
    }
    addData() {
        this.addimg = true;
    }
    addClose() {
        this.addimg = false;
    }
    saveData() {
        var flag = 0, errorMessage;
        var img_val = /\.(jpe?g|png|gif|jpg|JPE?G|PNG|GIF|JPG)$/i;
        if (this.edit == true && flag == 0) {
            if ((this.item.uploadimage != "" && this.item.uploadimage != undefined && this.item.uploadimage != null) && (!img_val.test(this.uploadfile.name))) {
                errorMessage = 'Please enter value';
                flag = 1;
                this._message.showError(errorMessage)
                return false;
            } else {
                this._appservice.addImageInGallery(this.item, this.uploadfile)
                    .subscribe((Response) => {
                        if (Response.success) {
                            this._message.showSuccess(Response.message);
                            this.popupDiv = false;
                            this.privewfile = false;
                            this.addimg = false;
                            this.getDetails(this.item);
                        } else {
                            this._message.showWarning(Response.message);
                        }
                    }, (Error) => {
                        this._message.showError(Error.message)
                    })
            }

        }
    }
    deleteData(item, gallery_item) {
        item.gallery_id = gallery_item._id;
        if (confirm("Are you sure want to delete this image?")) {
            this._appservice.removeImageInGallery(item).subscribe((Response) => {
                if (Response.success) {
                    this._message.showSuccess(Response.message);
                    this.addimg = false;
                    this.getDetails(gallery_item);
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
