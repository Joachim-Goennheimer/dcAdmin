import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatTableModule,
         MatPaginatorModule,
         MatSortModule,
         MatInputModule,
         MatCheckboxModule,
         MatDatepickerModule,
         MatNativeDateModule } from '@angular/material';
import { MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { SelectionModel } from '@angular/cdk/collections';


import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './auth/signin/signin.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AuthService } from './auth/auth.service';
import { UserProfileService } from './auth/user-profile/user-profile.service';
import { DataModelService } from './datamodel/datamodel.service';
import { OverviewComponent } from './overview/overview.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToDoListComponent } from './overview/to-do-list/to-do-list.component';
import { DataSummaryComponent } from './overview/data-summary/data-summary.component';
import { DocumentsComponent } from './documents/documents.component';
import { PdfFrameComponent } from './documents/pdf-frame/pdf-frame.component';
import { PdfFrameScanComponent } from './scan/pdf-frame-scan/pdf-frame-scan.component';
import { DocListComponent } from './documents/doc-list/doc-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ScanComponent } from './scan/scan.component';
import { DocumentFormComponent } from './scan/document-form/document-form.component';
import { ImportControlComponent } from './scan/import-control/import-control.component';
import { DocumentsService } from './documents.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'documentView', component: DocumentsComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'userProfile', component: UserProfileComponent }
  // { path: "category/structure", component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    SignupComponent,
    SigninComponent,
    UserProfileComponent,
    NavigationComponent,
    ToDoListComponent,
    DataSummaryComponent,
    DocumentsComponent,
    PdfFrameComponent,
    PdfFrameScanComponent,
    DocListComponent,
    ScanComponent,
    DocumentFormComponent,
    ImportControlComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    PdfViewerModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    NgbModule
  ],
  providers: [DataModelService, AuthService, UserProfileService, DocumentsService, MomentDateAdapter],
  bootstrap: [AppComponent]
})
export class AppModule { }
