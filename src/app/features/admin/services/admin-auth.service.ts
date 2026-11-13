import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

const AUTH_KEY = 'neon_admin_auth';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
    isLoggedIn = signal<boolean>(false);

    private router = inject(Router);
    private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    constructor() {
        if (this.isBrowser) this.isLoggedIn.set(sessionStorage.getItem(AUTH_KEY) === 'true');
    }

    login(username: string, password: string): boolean {
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            if (this.isBrowser) sessionStorage.setItem(AUTH_KEY, 'true');
            this.isLoggedIn.set(true);
            return true;
        }
        return false;
    }

    logout(): void {
        if (this.isBrowser) sessionStorage.removeItem(AUTH_KEY);
        this.isLoggedIn.set(false);
        this.router.navigate(['/admin/login']);
    }
}
