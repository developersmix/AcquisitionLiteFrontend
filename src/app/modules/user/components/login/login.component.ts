import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/Login';
import { SessionService } from 'src/app/modules/user/services/session-.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFormGroup?: FormGroup;
  private login?: Login;
  public isLoginFailed = false;
  public errorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private sessionService: SessionService,
    private router: Router
  ) { 
    this.createLoginForm();
  }

  ngOnInit(): void {
    window.sessionStorage.clear();
  }

  public createLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });
  }

  public validateLogin() {
    this.login = new Login(
      this.loginFormGroup!.value.username,
      this.loginFormGroup!.value.password
    );
    this.loginService.attemptLogin(this.login)
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
