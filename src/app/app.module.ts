import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { DataModelService } from './datamodel.service';
import { OverviewComponent } from './overview/overview.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const appRoutes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: "overview", component: OverviewComponent },
  { path: "login", component: SigninComponent },
  { path: "register", component: SignupComponent },
  // { path: "category/structure", component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    SignupComponent,
    SigninComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataModelService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
