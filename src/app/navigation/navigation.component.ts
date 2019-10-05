import { Component, OnInit } from '@angular/core';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  faFile = faFile;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogout(){
    this.authService.logoutUser();
  }

}
