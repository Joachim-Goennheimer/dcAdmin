import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getLoginTitleText() {
    return element(by.css('app-signin h1')).getText() as Promise<string>;
  }

  setLoginEMailOrUsername(username: string) {
    element(by.css('[name="email"]')).clear().then(() => {
      element(by.css('[name="email"]')).sendKeys(username);
    });
  }

  setLoginPassword(password: string) {
    element(by.css('[name="password"]')).clear().then(() => {
      element(by.css('[name="password"]')).sendKeys(password);
    });
  }

  getRegisterNavigationButton() {
    return element(by.css('[routerLink="/register"]'));
  }

  getRegisterTitleText() {
    return element(by.css('h1')).getText() as Promise<string>;
  }

  setRegisterUsername(username: string) {
    element(by.css('[name="userName"]')).clear().then(() => {
      element(by.css('[name="userName"]')).sendKeys(username);
    });
  }

  getRegisterUsername() {
    return element(by.css('[name="userName"]')).getAttribute('value');
  }

  setRegisterFirstName(firstName: string) {
    element(by.css('[name="firstName"]')).clear().then(() => {
      element(by.css('[name="firstName"]')).sendKeys(firstName);
    });
  }

  setRegisterLastName(lastName: string) {
    element(by.css('[name="lastName"]')).clear().then(() => {
      element(by.css('[name="lastName"]')).sendKeys(lastName);
    });
  }


  setRegisterEMail(email: string) {
    element(by.css('[name="email"]')).clear().then(() => {
      element(by.css('[name="email"]')).sendKeys(email);
    });
  }

  getRegisterEmail() {
    return element(by.css('[name="email"]')).getAttribute('value');
  }

  setRegisterPassword(password: string) {
    element(by.css('[name="password"]')).clear().then(() => {
      element(by.css('[name="password"]')).sendKeys(password);
    });
  }

  setRegisterConfirmPassword(confirmPassword: string) {
    element(by.css('[name="confirmPassword"]')).clear().then(() => {
      element(by.css('[name="confirmPassword"]')).sendKeys(confirmPassword);
    });
  }

  getRegisterPassword() {
    return element(by.css('[name="password"]')).getAttribute('value');
  }

  errorDisplayMessageExists() {
    return element(by.css('.errorMessageDisplay')).isPresent();
  }
  getErrorDisplayMessage() {
    return element(by.css('.errorMessageDisplay')).getText();
  }

  clickSignUpButton() {
    element(by.css('.btn-primary')).disabled = false;
    return element(by.css('.btn-primary')).click();
  }

  clickSignInButton() {
    return element(by.css('btn-primary'));
  }

  getOverviewTitleTest() {
    return element(by.css('h1')).getText() as Promise<string>;
  }
}
