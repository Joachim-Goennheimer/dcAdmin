import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';

/**
 * Manages the user registration form.
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  signUpMessage: string;

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  /**
   * Method invoked when user presses register. Calls authservice to check if passwords are the same.
   * So far no check whether username already in use.
   * @param form holds login data from html form
   */
  onSignup(form: NgForm) {
    const email = form.value.email;
    const username = form.value.userName;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;

    console.log(firstName);
    console.log(lastName);

    if (password === confirmPassword) {

      this.authservice.signupUser(email, username, password, firstName, lastName);
      this.signUpMessage = 'Sign Up successful';

    } else {
      this.signUpMessage = 'Password and Confirm Password did not match';
    }



  }

}
