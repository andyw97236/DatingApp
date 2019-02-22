import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-Nav",
  templateUrl: "./Nav.component.html",
  styleUrls: ["./Nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() { }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success("Logged in successfully");
      },
      error => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedin();
  }

  logout() {
    localStorage.removeItem("token");
    this.alertify.message("logged out");
    this.router.navigate(['/home']);
  }
}
