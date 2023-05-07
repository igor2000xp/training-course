import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  Filters,
  filtersMap,
  IFilters,
  IFilterSettings,
} from 'src/app/youtube/models/filters.model';

import { FilterSettingsService } from '../../services/filter-settings.service';

@Component({
  selector: 'app-sort-panel',
  templateUrl: './sort-panel.component.html',
  styleUrls: ['./sort-panel.component.scss'],
})
export class SortPanelComponent implements OnInit {
  @Output() public setFilterSettings: EventEmitter<IFilterSettings> =
    new EventEmitter();

  @Input() public filterSettings!: IFilterSettings;

  public filtersMap: IFilters = filtersMap;

  public actualFilterSettings!: IFilterSettings;

  constructor(private filterSettingsService: FilterSettingsService) {}

  public ngOnInit(): void {
    this.filtersMap = this.filterSettingsService.getFiltersMap();
    this.filterSettingsService
      .getFilterSettingsObservable()
      .subscribe(
        filterSettings => (this.actualFilterSettings = filterSettings)
      );
  }

  public setFilter(filter: Filters): void {
    this.filterSettingsService.changeFilter(filter);
  }

  public setKeyWord(input: HTMLInputElement): void {
    const keyWord: string = input.value.trim().toLocaleLowerCase();
    input.placeholder = keyWord;
    input.value = '';

    this.filterSettingsService.changeKeyWord(keyWord);
  }
}

// export default SortPanelComponent;
