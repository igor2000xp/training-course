import { Component, Input, OnInit } from '@angular/core';

import { IItem } from 'src/app/youtube/models/search-item.model';

import { IFilterSettings } from '../../models/filters.model';
import { CardsCollectionService } from '../../services/cards-collection.service';
import { FilterSettingsService } from '../../services/filter-settings.service';

@Component({
  selector: 'app-search-items-list',
  templateUrl: './search-items-list.component.html',
  styleUrls: ['./search-items-list.component.scss'],
})
export class SearchItemsListComponent implements OnInit {
  @Input() public items!: IItem[];

  public filterSettings!: IFilterSettings;

  constructor(
    private cardsCollectionService: CardsCollectionService,
    private filterSettingsService: FilterSettingsService
  ) {}

  ngOnInit() {
    this.filterSettingsService
      .getFilterSettingsObservable()
      .subscribe(filterSettings => (this.filterSettings = filterSettings));

    this.cardsCollectionService
      .getCardsStream()
      .subscribe(items => (this.items = items));
  }
}
