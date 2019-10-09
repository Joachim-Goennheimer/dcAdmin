import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  faUser = faUser;
  faEnvelope = faEnvelope;
  faBirthdayCake = faBirthdayCake;

  constructor() { }

  ngOnInit() {
  }

}
