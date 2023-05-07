import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotFoundPageComponent } from '../core/pages/not-found-page/not-found-page.component';
import { MaterialModule } from '../material/material.module';
import { ItemStatsComponent } from './components/item-stats/item-stats.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { SearchItemsListComponent } from './components/search-items-list/search-items-list.component';
import { SortPanelComponent } from './components/sort-panel/sort-panel.component';
import { BorderColorByDateDirective } from './directives/border-color-by-date.directive';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { YoutubePageComponent } from './pages/youtube-page/youtube-page.component';
import { FilterCardsPipe } from './pipes/filter-cards.pipe';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [
    SearchItemsListComponent,
    SearchItemComponent,
    ItemStatsComponent,
    SortPanelComponent,
    BorderColorByDateDirective,
    YoutubePageComponent,
    FilterCardsPipe,
    NotFoundPageComponent,
    DetailsPageComponent,
    ItemStatsComponent,
  ],
  imports: [CommonModule, MaterialModule, YoutubeRoutingModule],
  exports: [YoutubePageComponent],
})
export class YoutubeModule {}
