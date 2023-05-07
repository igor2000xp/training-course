import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortDataService {
  str$ = new BehaviorSubject<string>('');

  filter$ = new Subject<boolean>();

  startSearch(str: string) {
    this.str$.next(str);
  }

  setFilter(value: boolean) {
    this.filter$.next(value);
  }
}
