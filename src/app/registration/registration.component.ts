import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  user: User;

  usernameControl = new FormControl('', Validators.compose([
    Validators.minLength(4),
    Validators.maxLength(50)
  ]));

  passwordControl = new FormControl('', Validators.maxLength(100));

  firstnameControl = new FormControl('', Validators.compose([
    Validators.minLength(4),
    Validators.maxLength(50)
  ]));

  lastnameControl = new FormControl('', Validators.compose([
    Validators.minLength(4),
    Validators.maxLength(50)
  ]));

  emailControl = new FormControl('', Validators.compose([
    Validators.email
  ]));

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initregistrationForm();
  }

  initregistrationForm() {
    this.registrationForm = this.formBuilder.group({
      usernameControl: this.usernameControl,
      passwordControl: this.passwordControl,
      firstnameControl: this.firstnameControl,
      lastnameControl: this.lastnameControl,
      emailControl: this.emailControl
    });
  }

  getUser() {
    this.user = {
      id: null,
      username: this.usernameControl.value.toString(),
      password: this.passwordControl.value.toString(),
      firstname: this.firstnameControl.value.toString(),
      lastname: this.lastnameControl.value.toString(),
      email: this.emailControl.value.toString(),
      lastAccess: null,
      telegramUserId: null
    };
    return this.user;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.spinner.show();
      this.userService
        .create(this.getUser())
        .pipe(first())
        .subscribe(
          response => {
            this.spinner.hide();
            this.snackbar.open('Successfully registered user!', '', { duration: 1000 });
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000);
          },
          error => {
            this.snackbar.open('User already exist!', '', { duration: 1000 });
          }
        );
    }
  }

}
