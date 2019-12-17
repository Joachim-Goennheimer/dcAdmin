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
/**
 * Component that manages the login form. Communicates closely with the authentication service
 */
export class SigninComponent implements OnInit {

  wrongUserCredentials = false;

  constructor(private authservice: AuthService) { }

  ngOnInit() {

  }

  /**
   * Method invoked when user presses login. Calls authservice to check if valid usercredentials.
   * If not sets wrongUserCredentials to true and displays message to user.
   * @param form holds login data from html form
   */
  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authservice.signinUser(email, password);
    this.authservice.signInSuccessSubject
    .subscribe(
      (signInSuccessMessage: boolean) => {
        this.wrongUserCredentials = !signInSuccessMessage;
      }
    );
    console.log('signing in');
  }
}
