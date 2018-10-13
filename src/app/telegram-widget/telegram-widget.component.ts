import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

export interface TelegramUser {

    id: string;
    username: string | null;
    firstname: string;
    lastname: string;
}

@Component({
    selector: 'app-telegram-widget',
    templateUrl: './telegram-widget.component.html',
    styleUrls: ['./telegram-widget.component.css']
})
export class TelegramWidgetComponent implements OnInit, AfterViewInit {

    telegramUser: TelegramUser | null;

    @ViewChild('script')
    script: ElementRef;

    constructor() { }

    ngOnInit() {
        const global: any = window;
        global.TelegramLoginWidget = {
            onTelegramAuth: user => this.onTelegramAuth(user)
        };
    }

    ngAfterViewInit() {
        this.createScriptElement();
    }

    createScriptElement() {
        const element = this.script.nativeElement;
        const script = document.createElement('script');

        script.src = 'https://telegram.org/js/telegram-widget.js?4';
        script.setAttribute('data-telegram-login', 'tacs_grupo1_test_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-onauth', 'TelegramLoginWidget.onTelegramAuth(user)');
        script.setAttribute('data-request-access', 'write');
        script.async = true;

        const parent = element.parentElement;
        parent.parentElement.replaceChild(script, parent);
    }

    onTelegramAuth(user) {
        this.telegramUser = {
            id: user.id,
            username: user.username,
            firstname: user.first_name,
            lastname: user.last_name
        };
    }

    getTelegramUser() {
        return this.telegramUser;
    }
}
