import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import {
  filtersMap,
  IFilterSettings,
} from 'src/app/youtube/models/filters.model';
import { IItem } from 'src/app/youtube/models/search-item.model';

import { SortDataService } from '../../services/sort-data.service';
import { YoutubeFetchService } from '../../services/youtube-fetch.service';

@Component({
  selector: 'app-youtube-page',
  templateUrl: './youtube-page.component.html',
  styleUrls: ['./youtube-page.component.scss'],
})
export class YoutubePageComponent implements OnInit, OnDestroy {
  public filterSettings: IFilterSettings = {
    keyWord: '',
    isReverse: false,
    filterBy: filtersMap.none,
  };

  public handleNewFilterSettings(settings: IFilterSettings): void {
    this.filterSettings = settings;
  }

  isVisible = false;

  searchString!: string;

  searchData!: Observable<IItem[]>;

  videoSubscription!: Subscription;

  filterSubscription!: Subscription;

  constructor(
    private sortDataService: SortDataService,
    private youtubeFetchService: YoutubeFetchService
  ) {}

  ngOnInit() {
    this.videoSubscription = this.sortDataService.str$.subscribe(str => {
      this.searchString = str;
      this.searchData = this.youtubeFetchService.getVideoList(
        this.searchString
      );
    });

    this.filterSubscription = this.sortDataService.filter$.subscribe(data => {
      if (data === true) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    });
  }

  ngOnDestroy() {
    this.videoSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }
}
