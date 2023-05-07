import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FilterSettingsService } from 'src/app/youtube/services/filter-settings.service';
import { SortDataService } from 'src/app/youtube/services/sort-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isVisible: boolean;

  searchField!: FormControl;

  searchSub!: Subscription;

  authSub!: Subscription;

  emailSub!: Subscription;

  _isAuth!: boolean;

  _email!: string;

  constructor(
    private search: SortDataService,
    private filters: SortDataService,
    private filerSettingsService: FilterSettingsService,
    private auth: AuthService
  ) {
    this.isVisible = false;
  }

  ngOnInit() {
    this.searchField = new FormControl('');
    this.searchSub = this.searchField.valueChanges
      .pipe(
        filter(value => value.length >= 3),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(str => {
        this.search.startSearch(str);
      });

    this.auth.isAuth$.subscribe(isAuth => {
      this._isAuth = isAuth;
    });

    this.auth.userEmail$.subscribe(email => {
      this._email = email.split('@')[0];
    });
  }

  public setEmptyKeyWord() {
    this.filerSettingsService.changeKeyWord('');
  }

  public toggleFilters() {
    this.isVisible = !this.isVisible;
    this.filters.setFilter(this.isVisible);
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }
}
