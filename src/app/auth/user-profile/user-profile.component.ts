import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './user-profile.model';

/**
 * manages logic of User Profile.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  faUser = faUser;
  faEnvelope = faEnvelope;
  faBirthdayCake = faBirthdayCake;

  newUserPictureFile: File;
  showSaveNewPictureButton = false;
  currentUserPictureURL: any;

  userProfile = new UserProfile();
  showEditUsername = false;
  newUsername: string;
  showEditEmail = false;
  newEmail: string;
  showEditFirstAndLastName = false;
  newFirstName: string;
  newLastName: string;


  constructor(private upService: UserProfileService) { }

  ngOnInit() {
    this.upService.getUserProfileData()
      .subscribe(
        (response) => {
          console.log("getting User Data");
          console.log(response);
          this.userProfile.username = response.username;
          this.userProfile.firstName = response.firstName;
          this.userProfile.lastName = response.lastName;
          this.userProfile.email = response.email;
          console.log(this.userProfile);

        },
        (error) => console.log(error)
      );

    this.upService.getUserProfilePicture()
      .subscribe(
        (response: Blob) => {
          this.createImageFromBlob(response);
        },
        (error: Blob) => {
          this.createImageFromBlob(error);
        }
      );

  }

  /**
   * function that converts the raw image from the server into a format that can be displayed
   * in the browser
   * @param image image data from server as blob object
   */
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.currentUserPictureURL = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  /**
   * function that is invoked when user changes his profile picture
   * the new profile picture will automatically be displayed to the user
   * when the user clicks on upload the onEditProfilePicuture() function will be invoked
   * and the new profile picture is sent to the server
   */
  onProfilePictureChanged(event){
    this.newUserPictureFile = event.target.files[0]
    this.currentUserPictureURL = this.createImageFromBlob(event.target.files[0])
    this.showSaveNewPictureButton = true;
  }

  /**
   * function that sends request to server to update user picture there.
   */
  onEditProfilePicture(){
    this.upService.editUserProfilePicture(this.newUserPictureFile);
    this.showSaveNewPictureButton = false;
  }

  onEditUsername() {
    this.showEditUsername = true;
  }

  onEditFirstAndLastName() {
    this.showEditFirstAndLastName = true;
  }
  /**
   * function is invoked when user has edited and saved new first and/or last names. Sends request to server
   * and updates the information.
   */
  onSaveFirstAndLastName() {
    const updateUserProfileObject = new UserProfile();

    updateUserProfileObject.firstName = this.newFirstName;
    updateUserProfileObject.lastName = this.newLastName;
    updateUserProfileObject.email = this.userProfile.email;

    this.upService.editUser(updateUserProfileObject)
    .subscribe(
      (response) => {
        this.userProfile.firstName = this.newFirstName;
        this.userProfile.lastName = this.newLastName;
      },
      (error) => {
        this.userProfile.firstName = this.newFirstName;
        this.userProfile.lastName = this.newLastName;
      }
    );
    this.showEditFirstAndLastName = false;
  }

  onEditEmail() {
    this.showEditEmail = true;
  }

  /**
   * function is invoked when user has edited and saved new email address. Sends request to server
   * and updates the information.
   */
  onSaveEmail() {
    const updateUserProfileObject = new UserProfile();

    updateUserProfileObject.firstName = this.userProfile.firstName;
    updateUserProfileObject.lastName = this.userProfile.lastName;
    updateUserProfileObject.email = this.newEmail;

    this.upService.editUser(updateUserProfileObject)
    .subscribe(
      (response) => {
        this.userProfile.email = this.newEmail;
      },
      (error) => {
        this.userProfile.email = this.newEmail;
      }
    );
    this.showEditEmail = false;
  }
}
