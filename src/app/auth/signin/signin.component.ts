import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

/**
 * Manages the user login form.
 */
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {

  }

  wrongUserCredentials = false;

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authservice.signinUser(email, password);
    this.authservice.signInSuccessSubject
    .subscribe(
      (signInSuccessMessage: boolean) => {
        this.wrongUserCredentials = !signInSuccessMessage;
      }

    )
    console.log('signing in');

  }

}
