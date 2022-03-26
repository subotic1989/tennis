import { Component, OnInit } from '@angular/core';
import { signOutAction } from '@app/pages/auth/store/auth.actions';
import {
  isAdminSelector,
  isAuthSelector,
} from '@app/pages/auth/store/auth.selectors';

import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store, public translate: TranslateService) {}

  ngOnInit(): void {
    this.initValues();
  }

  initValues() {
    this.isLoggedIn$ = this.store.pipe(select(isAuthSelector));
    this.isAdmin$ = this.store.pipe(select(isAdminSelector));

    this.translate.addLangs(['en', 'de', 'hr']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|de|hr/) ? browserLang : 'en');
  }

  signOut() {
    this.store.dispatch(signOutAction());
  }
}