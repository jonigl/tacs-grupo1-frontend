import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { User, UserRequest } from 'src/app/_models';
import { first } from 'rxjs/internal/operators/first';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TelegramWidgetComponent } from 'src/app/telegram-widget/telegram-widget.component';
import { MatSnackBar } from '@angular/material';
import { AccountSavedSnackBarComponent } from './account-saved-snack-bar/account-saved-snack-bar.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    user: User;

    basicInfoForm: FormGroup;

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

    @ViewChild(TelegramWidgetComponent)
    telegramWidget: TelegramWidgetComponent;

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private userService: UserService) { }

    ngOnInit() {
        this.initUser();
        this.initBasicInfoForm();
    }

    initBasicInfoForm() {
        this.basicInfoForm = this.formBuilder.group({
            usernameControl: this.usernameControl,
            passwordControl: this.passwordControl,
            firstnameControl: this.firstnameControl,
            lastnameControl: this.lastnameControl
        });
    }

    initValues() {
        this.usernameControl.setValue(this.user.username);
        this.firstnameControl.setValue(this.user.firstname);
        this.lastnameControl.setValue(this.user.lastname);
    }

    initUser() {
        this.userService.getUser()
            .pipe(first())
            .subscribe(user => {
                this.user = user;
                this.initValues();
            });
    }

    getTelegramUserId(): number | null {
        const telegramUser = this.telegramWidget.getTelegramUser();
        return telegramUser ? Number(telegramUser.id) : null;
    }

    getUserRequestFromForm() {
        const userRequest: UserRequest = {
            username: this.usernameControl.value.toString(),
            password: this.passwordControl.value ? this.passwordControl.value.toString() : null,
            firstname: this.firstnameControl.value.toString(),
            lastname: this.lastnameControl.value.toString(),
            telegramUserId: this.getTelegramUserId()
        };

        return userRequest;
    }

    onSubmit() {
        if (this.basicInfoForm.valid) {
            this.userService.updateUser(this.getUserRequestFromForm())
                .pipe(first())
                .subscribe(user => {
                    this.user = user;
                    this.initValues();
                    this.snackBar.openFromComponent(AccountSavedSnackBarComponent, {
                        duration: 1000,
                      });
                });
        }
    }
}
