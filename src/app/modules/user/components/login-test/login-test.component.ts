import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/Login';
import { LoginService } from '../../services/login.service';
import { SessionService } from '../../services/session-.service';

@Component({
  selector: 'app-login-test',
  templateUrl: './login-test.component.html',
  styleUrls: ['./login-test.component.scss']
})
export class LoginTestComponent implements OnInit {

  errorMessage = "";
  isLoginFailed = false;
  select_user: any;
  user_value: string = "";

  constructor(
    private loginService: LoginService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.sessionStorage.clear();
    this.select_user = <HTMLInputElement>document.getElementById("select_user");
    this.select_user.value = "control";
    this.user_value = "control";
  }

  updateUserValue() {
    this.user_value = this.select_user.value;
  }

  validateLogin() {
    let username = this.user_value;
    let password = this.user_value.substring(0,3);
    let login: Login = new Login(username, password);
    
    this.loginService.attemptLogin(login)
      .subscribe(data => {
        this.sessionService.setAuthorities(data.authorities!);
        this.sessionService.setToken(data.token!);
        this.sessionService.setUserprofile(data.userProfile!);
        this.router.navigate(["home"]);
        }, error => {
            this.isLoginFailed = true;
            var e: HttpErrorResponse = error;
            if (e.status === 0) {
              this.errorMessage = "Connection to server not established.";
            } else if (e.status === 401) {
              this.errorMessage = "Unauthorized -> Bad credentials.";
            } else { console.log(e.message + " in + " + this.constructor.name.toString()); }
      });
  }

}
