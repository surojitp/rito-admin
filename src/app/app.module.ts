import { NgModule, ViewContainerRef } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { UserService } from './userservice/user.service';
import { MessageService } from './userservice/message.services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Broadcaster } from './broadcaster';
import { HighlightPipe } from './highlight.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'angular2-moment';

import { HomecontentComponent } from './homecontent/homecontent.component';
import { PharmacylocatorcontentComponent } from './pharmacylocatorcontent/pharmacylocatorcontent.component';
import { GoldcardcontentComponent } from './goldcardcontent/goldcardcontent.component';
import { PrintcardcontentComponent } from './printcardcontent/printcardcontent.component';
import { RegistercontentComponent } from './registercontent/registercontent.component';
import { ImageComponent } from './image/image.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrintComponent } from './print/print.component';
import { ServiceComponent } from './service/service.component';
import { HeadercontentComponent } from './headercontent/headercontent.component';
import { FootercontentComponent } from './footercontent/footercontent.component';
import { ColumnComponent } from './column/column.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { UserComponent } from './user/user.component';
import { PrintcardapplyComponent } from './printcardapply/printcardapply.component';
import { SettingComponent } from './setting/setting.component';
import { LoginComponent } from './login/login.component';

import { ToastrModule } from 'ngx-toastr';
import { NgDatepickerModule } from 'ng2-datepicker';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

import { AuthGuard } from './guards/index';

//import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from 'ng2-ckeditor';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    AppComponent,
    HighlightPipe,
    HomecontentComponent,
    PharmacylocatorcontentComponent,
    GoldcardcontentComponent,
    PrintcardcontentComponent,
    RegistercontentComponent,
    ImageComponent,
    GalleryComponent,
    DashboardComponent,
    PrintComponent,
    ServiceComponent,
    HeadercontentComponent,
    FootercontentComponent,
    ColumnComponent,
    PharmacyComponent,
    UserComponent,
    PrintcardapplyComponent,
    SettingComponent,
    LoginComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule, ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule, BrowserAnimationsModule,
    HttpModule,
    CKEditorModule,
    NgDatepickerModule,
    Ng2DatetimePickerModule,
    BsDatepickerModule.forRoot(),
    MomentModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],

  providers: [

    Broadcaster,
    UserService, MessageService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
