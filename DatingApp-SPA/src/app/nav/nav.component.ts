import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      // this.alertify.success('Logged in successfully');
      this.openSnackBar('good job!', 'you logged in');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

loggedIn() {
  return this.authService.loggedIn();
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.authService.decodedToken = null;
  this.authService.currentUser = null;
  this.openSnackBar('good job!', 'you logged out');
  // this.alertify.message('logged out');
  this.router.navigate(['/home']);
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 1500,
  });
}
}
