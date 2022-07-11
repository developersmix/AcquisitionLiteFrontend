import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../models/Role';
import { User } from '../../models/User';
import { Userprofile } from '../../models/Userprofile';
import { AuthorityService } from '../../services/authority.service';
import { RoleService } from '../../services/role.service';
import { SessionService } from '../../services/session-.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.scss']
})
export class UserReadComponent implements OnInit {

  private userprofile: Userprofile = new Userprofile();
  users: User[] = [];
  roles: Role[] = [];

  constructor(private sessionService: SessionService,
    private authorityService: AuthorityService,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router) { }

  ngOnInit(): void {
    this.userprofile = this.sessionService.getUserprofile();
    this.getUserData();
  }

  /*
  ----------------------------------------
   SHOW MODULES USING AUTHORITY CONDITIONS
  ----------------------------------------
  */

  showAdd(): any {
    var showModule: Boolean = false;
    if (this.sessionService.getAuthorities().includes("ROLE_ADMIN") ||
      this.sessionService.getAuthorities().includes("ROLE_MANAGER") ||
      this.sessionService.getAuthorities().includes("ROLE_PRODUCTION")) {
      showModule = true;
    }
    return showModule;
  }

  showEdit(): any {
    var showModule: Boolean = false;
    if (this.sessionService.getAuthorities().includes("ROLE_MANAGER") ||
      this.sessionService.getAuthorities().includes("ROLE_ADMIN")) {
      showModule = true;
    }
    return showModule;
  }

  showIfAdmin(): any {
    var showModule: Boolean = false;
    if (this.sessionService.getAuthorities().includes("ROLE_ADMIN")) {
      showModule = true;
    }
    return showModule;
  }

  /*
  ---------------------
  GET ALL USERS, MODULES AND ROLES FOR TO SHOW A CUSTOM LIST
  ---------------------
  */

  /**
   * Get all users as List.
   */
  getUserData() {
    this.userService.findAll()
      .toPromise().then((data: any) => {
        this.users = data;
        console.log("users : ", this.users);
      }, error => {
        var e:string = error.error.message;
        if(e==undefined || !e.valueOf()) {
          alert("Connection to serve not established.");
        } else { alert(e + " from UserList.getUserData()"); }
      });
  }

  /**
   * Go to user's add form
   */
  loadSaveForm() {
    this.router.navigate(["user/add"]);
  }

  /*
  -------------------------
  LOAD USER UPDATE FORM
  -------------------------
  */
  /**
   * Get the id value and pass it as parameter to the update form.
   * @param user Object type User according to the chosen id.
   */
  loadEditForm(user: User): void {
    localStorage.setItem("id", user.id!.toString());
    this.router.navigate(["user/edit"]);
  }

  delete(user: User) {

  }

  
}
