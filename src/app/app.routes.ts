import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PrintComponent } from './print/print.component';
import { HomecontentComponent } from './homecontent/homecontent.component';
import { PharmacylocatorcontentComponent } from './pharmacylocatorcontent/pharmacylocatorcontent.component';
import { GoldcardcontentComponent } from './goldcardcontent/goldcardcontent.component';
import { PrintcardcontentComponent } from './printcardcontent/printcardcontent.component';
import { RegistercontentComponent } from './registercontent/registercontent.component';
import { FootercontentComponent } from './footercontent/footercontent.component';
import { ColumnComponent } from './column/column.component';
import { ImageComponent } from './image/image.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { UserComponent } from './user/user.component';
import { PrintcardapplyComponent } from './printcardapply/printcardapply.component';
import { ServiceComponent } from './service/service.component';
import { HeadercontentComponent } from './headercontent/headercontent.component';
import { SettingComponent } from './setting/setting.component';
import { LoginComponent } from './login/login.component';

import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

import { AuthGuard } from './guards/index';


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'print', component: PrintComponent, canActivate: [AuthGuard] },
  { path: 'service', component: ServiceComponent, canActivate: [AuthGuard] },
  { path: 'headercontent', component: HeadercontentComponent, canActivate: [AuthGuard] },
  { path: 'footercontent', component: FootercontentComponent, canActivate: [AuthGuard] },
  { path: 'column', component: ColumnComponent, canActivate: [AuthGuard] },
  { path: 'homecontent', component: HomecontentComponent, canActivate: [AuthGuard] },
  { path: 'pharmacylocatorcontent', component: PharmacylocatorcontentComponent, canActivate: [AuthGuard] },
  { path: 'goldcardcontent', component: GoldcardcontentComponent, canActivate: [AuthGuard] },
  { path: 'printcardcontent', component: PrintcardcontentComponent, canActivate: [AuthGuard] },
  { path: 'registercontent', component: RegistercontentComponent, canActivate: [AuthGuard] },
  { path: 'image', component: ImageComponent, canActivate: [AuthGuard] },
  { path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard] },
  { path: 'pharmacy', component: PharmacyComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'printcardapply', component: PrintcardapplyComponent, canActivate: [AuthGuard] },
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'Changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard] },
  { path: 'forgotpassword/:id', component: ForgotpasswordComponent }
];
