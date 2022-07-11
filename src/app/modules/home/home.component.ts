import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SocketClientService } from '../notification/services/socket-client.service';
import { RequisitionSerialized } from '../requisition/models/RequisitionSerialized';
import { RequisitionService } from '../requisition/services/requisition.service';
import { SessionService } from '../user/services/session-.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  loginActive: boolean = false;
  employeeName: string = "";
  navbarNav: any;
  officeName: string = "";
  show_navbar: boolean = false;
  userRole: string = "";
  public errorMessage = "";

  level1: string = "";
  level2: string = "";

  year = new Date().getFullYear();

  requisitionsCreated: number = 0;
  requisitionSerialized: RequisitionSerialized = new RequisitionSerialized();
  requisitionSerializedList: RequisitionSerialized[] = [];

  constructor( private sessionService: SessionService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private socketClientService: SocketClientService,
    private requisitionService: RequisitionService ) { }

  ngOnInit(): void {
    this.navbarNav = document.getElementById("navbarNav");
    this.show_navbar = false;
    this.showNavbar();

    this.getUserProfile();
    this.configureBreadcrumb();
    this.findAllInCreatedStatus();
    this.socketClientService.connect();
    this.requisitionService.requisitionsCreated$.subscribe(total => this.requisitionsCreated = total);
  }

  getUserProfile() {
    let userprofile = this.sessionService.getUserprofile();
    this.employeeName = userprofile.employeeName!;
    this.officeName = userprofile.officeName!;
    this.userRole = this.sessionService.getAuthorities()[0].split("_")[1];
  }

  configureBreadcrumb() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if ( this.activatedRouter.snapshot.children.length > 0 ) {
          if ( this.activatedRouter.snapshot.firstChild?.children.length == 0 ) {
            let l1 = this.activatedRouter.snapshot.firstChild.data
            this.level1  = l1["breadcrumb"];
            this.level2  = "";
          } else {
              let l1 = this.activatedRouter.snapshot.firstChild?.firstChild?.data;
              let l2 = this.activatedRouter.snapshot.firstChild?.firstChild?.firstChild?.data
              this.level1  = l1!["breadcrumb"];
              this.level2  = l2!["breadcrumb"];
          }
        } else {
            this.level1  = "";
            this.level2  = "";
        }
      }
    });
  }

  showModule(): any {
    let showModule: boolean = false;
    if ( this.employeeName == "admin" ) {
      showModule = true;
    }
    return showModule;
  }

  showAdministrativa(): any {
    let showModule: boolean = false;
    if (this.userRole === "ADMIN" || this.officeName.includes("ADMINISTRATIVA")) {
      showModule=true;
    } else { showModule = false; }
    return showModule;
  }

  showControl(): any {
    let showModule: boolean = false;
    if (this.userRole === "ADMIN") {
      showModule=true;
    } else { showModule = false; }
    return showModule;
  }

  showFarmacia(): any {
    let showModule: boolean = false;
    if (this.userRole === "ADMIN" || this.officeName.includes("FARMACIA")) {
      showModule=true;
    } else { showModule = false; }
    return showModule;
  }

  showMateriales(): any {
    let showModule: boolean = false;
    if (this.userRole === "ADMIN" || this.officeName.includes("MATERIALES")) {
      showModule=true;
    } else { showModule = false; }
    return showModule;
  }

  findAllInCreatedStatus() {
    this.requisitionService.findAllInCreatedStatus()
      .subscribe(data => {
        this.requisitionSerializedList = data;
        this.requisitionService.updateRequisitionsCreated(data.length);
      }, error => {
        let e: HttpErrorResponse = error;
        if (e.status === 0) {
          this.errorMessage = "Connection to server not established.";
        } else if (e.status === 401) {
          this.errorMessage = "Unauthorized -> Bad credentials.";
        } else { alert("Status : " + e.status + " Error : " + e.message + " in " + this.constructor.name.toString()); }
      });
        /*
      }, error => {
        let e: HttpErrorResponse = error;
        alert("Status : " + e.status + " Error : " + e.message );
      });
      */
  }

  showNavbar() {
    if(!this.show_navbar) {
      this.navbarNav.style.display = "block";
      this.show_navbar = true;
    } else {
      this.navbarNav.style.display = "none";
      this.show_navbar = false;
    }
  }

  hideSidebar() {
    this.navbarNav.style.display = "none";
    this.show_navbar = false;
  }

  public logOut() {
    this.router.navigate(['login-test']);
    this.sessionService.clear();
    this.socketClientService.disconnect();
  }
  
}
