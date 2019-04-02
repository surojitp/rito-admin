import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { CONFIG } from "../../../config";
import { HighlightPipe } from '../highlight.pipe';


@Component({
    selector: 'printcardapply',
    styleUrls: ['./printcardapply.component.css'],
    templateUrl: './printcardapply.component.html',
})
// class Select
export class PrintcardapplyComponent implements OnInit {
    edit: boolean;
    data: any;
    admintoken: any;
    pagetitle: any;
    popupDiv: any;
    item: any = {};

    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
    ) { }

    ngOnInit(): void {
        this.data = [];
        this.admintoken = localStorage.getItem('admintoken');
        this._appservice.getAllPrintCardApply().subscribe((Response) => {
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
        this.pagetitle = 'View Details';
        this.item = str;
        console.log('this.item',this.item);
    }

    deleteData(item) {
        if (confirm("Are you sure want to delete this data?")) {
            this._appservice.deletePrintCardApply(item).subscribe((Response) => {
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
