import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatCheckboxModule } from '@angular/material';
// import { SelectionModel } from '@angular/cdk/collections';


import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './auth/signin/signin.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AuthService } from './auth/auth.service';
import { DataModelService } from './datamodel/datamodel.service';
import { OverviewComponent } from './overview/overview.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToDoListComponent } from './overview/to-do-list/to-do-list.component';
import { DataSummaryComponent } from './overview/data-summary/data-summary.component';
import { DashboardComponent } from './overview/dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { PdfFrameComponent } from './documents/pdf-frame/pdf-frame.component';
import { DocNavigationComponent } from './documents/doc-navigation/doc-navigation.component';
import { DocListComponent } from './documents/doc-list/doc-list.component';
import { DocDetailsComponent } from './documents/doc-details/doc-details.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: "overview", component: OverviewComponent },
  { path: "documentView", component: DocumentsComponent },
  { path: "login", component: SigninComponent },
  { path: "register", component: SignupComponent },
  { path: "userProfile", component: UserProfileComponent }
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
    DashboardComponent,
    DocumentsComponent,
    PdfFrameComponent,
    DocNavigationComponent,
    DocListComponent,
    DocDetailsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    PdfViewerModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [DataModelService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
