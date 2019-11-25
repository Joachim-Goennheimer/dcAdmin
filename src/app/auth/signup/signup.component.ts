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

  onSignup(form: NgForm) {
    const email = form.value.email;
    const username = form.value.userName;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    if(password === confirmPassword) {

      this.authservice.signupUser(email, username, password);
      this.signUpMessage = 'Sign Up successful';

    } else {
      this.signUpMessage = 'Password and Confirm Password did not match';
    }



  }

}
