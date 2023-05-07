import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Filters, IFilters, IFilterSettings } from '../models/filters.model';

@Injectable({
  providedIn: 'root',
})
export class FilterSettingsService {
  private filtersMap: IFilters = {
    date: 'DATE',
    view: 'VIEW',
    empty: 'NONE',
  };

  private filterSettings: IFilterSettings = {
    placeholder: '',
    keyWord: '',
    isReverse: false,
    filterBy: this.filtersMap.empty,
  };

  private filterSubject = new BehaviorSubject(this.filterSettings);

  public changeFilter(filterBy: Filters): void {
    let newSettings: IFilterSettings;
    if (this.filterSettings.filterBy === filterBy) {
      newSettings = {
        ...this.filterSettings,
        filterBy,
        isReverse: !this.filterSettings.isReverse,
      };
    } else {
      newSettings = { ...this.filterSettings, filterBy, isReverse: false };
    }
    this.filterSettings = newSettings;
    this.filterSubject.next(newSettings);
  }

  public changeKeyWord(keyWord: string): void {
    const placeholder = keyWord;
    const newSettings: IFilterSettings = {
      ...this.filterSettings,
      placeholder,
      keyWord,
    };
    this.filterSettings = newSettings;
    this.filterSubject.next(newSettings);
  }

  public getFilterSettingsObservable(): Observable<IFilterSettings> {
    return this.filterSubject;
  }

  public getFiltersMap(): IFilters {
    return this.filtersMap;
  }
}
