import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display sign in message', () => {
    page.navigateTo();
    expect(page.getLoginTitleText()).toEqual('Sign In');
  });

  it('should navigate to the Sign Up page', () => {
    page.navigateTo();
    page.getRegisterNavigationButton().click();
    expect(page.getRegisterTitleText()).toEqual('Sign Up');
  });

  it('should not register a user without valid username', () => {
    page.navigateTo();
    page.getRegisterNavigationButton().click();
    page.setRegisterUsername('');
    page.setRegisterFirstName('firstName');
    page.setRegisterLastName('lastName');
    page.setRegisterEMail('test@test.de');
    page.setRegisterPassword('password123');
    page.setRegisterConfirmPassword('password123');
    page.clickSignUpButton();
    expect(page.getRegisterTitleText()).toEqual('Sign Up');
  });

  it('should not register a user without entering a First Name', () => {
    page.navigateTo();
    page.getRegisterNavigationButton().click();
    page.setRegisterUsername('testUser12131415');
    page.setRegisterFirstName('');
    page.setRegisterLastName('lastName');
    page.setRegisterEMail('test@test.de');
    page.setRegisterPassword('password123');
    page.setRegisterConfirmPassword('password123');
    page.clickSignUpButton();
    expect(page.getRegisterTitleText()).toEqual('Sign Up');
  });

  it('should not register a user without entering a Last Name', () => {
    page.navigateTo();
    page.getRegisterNavigationButton().click();
    page.setRegisterUsername('testUser12131415');
    page.setRegisterFirstName('firstName');
    page.setRegisterLastName('');
    page.setRegisterEMail('test@test.de');
    page.setRegisterPassword('password123');
    page.setRegisterConfirmPassword('password123');
    page.clickSignUpButton();
    expect(page.getRegisterTitleText()).toEqual('Sign Up');
  });

  it('should not register a user without valid email address', () => {
    page.navigateTo();
    page.getRegisterNavigationButton().click();
    page.setRegisterUsername('testUser12131415');
    page.setRegisterFirstName('firstName');
    page.setRegisterLastName('lastName');
    page.setRegisterEMail('test.de');
    page.setRegisterPassword('password123');
    page.setRegisterConfirmPassword('password123');
    page.clickSignUpButton();
    expect(page.getRegisterTitleText()).toEqual('Sign Up');
  });

  it('should not register a user without valid password', () => {
    page.navigateTo();
    page.getRegisterNavigationButton().click();
    page.setRegisterUsername('testUser12131415');
    page.setRegisterFirstName('firstName');
    page.setRegisterLastName('lastName');
    page.setRegisterEMail('test@test.de');
    page.setRegisterPassword('ab');
    page.setRegisterConfirmPassword('ab');
    page.clickSignUpButton();
    expect(page.getRegisterTitleText()).toEqual('Sign Up');
  });

  it('should not register a user if password and confirm password are not equal', () => {
    page.navigateTo();
    page.getRegisterNavigationButton().click();
    page.setRegisterUsername('testUser12131415');
    page.setRegisterFirstName('firstName');
    page.setRegisterLastName('lastName');
    page.setRegisterEMail('test@test.de');
    page.setRegisterPassword('password123');
    page.setRegisterConfirmPassword('password12345');
    page.clickSignUpButton();
    expect(page.getRegisterTitleText()).toEqual('Sign Up');
  });

  it('should register a user if all inputs were entered correctly', () => {
    page.navigateTo();
    page.getRegisterNavigationButton().click();
    page.setRegisterUsername('testUser12131415');
    page.setRegisterFirstName('firstName');
    page.setRegisterLastName('lastName');
    page.setRegisterEMail('test@test.de');
    page.setRegisterPassword('password123');
    page.setRegisterConfirmPassword('password123');
    page.clickSignUpButton();
    expect(page.getLoginTitleText()).toEqual('Sign In');
  });

  it('should not log in a user if he enters the wrong username', () => {
    page.navigateTo();
    page.setLoginEMailOrUsername('notaUserName');
    page.setLoginPassword('password123');
    page.clickSignInButton();
    expect(page.getLoginTitleText()).toEqual('Sign In');
  });

  it('should not log in a user if he enters the wrong password', () => {
    page.navigateTo();
    page.setLoginEMailOrUsername('testUser12131415');
    page.setLoginPassword('notaPassword');
    page.clickSignInButton();
    expect(page.getLoginTitleText()).toEqual('Sign In');
  });

  // Test does not work because sign in sometimes takes several seconds until it receives confirmation from
  // backend. SetTimeout as well as other functions like browser.wait did not work.
  // it('should log in a user if he enters the correct user credentials', () => {
  //   page.navigateTo();
  //   page.setLoginEMailOrUsername('username');
  //   page.setLoginPassword('password123');
  //   page.clickSignInButton();
  //   expect(page.getOverviewTitleTest()).toEqual('Sign In');
  // })

});
