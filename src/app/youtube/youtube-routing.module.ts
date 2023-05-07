import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { YoutubePageComponent } from './pages/youtube-page/youtube-page.component';

const routes: Routes = [
  {
    path: '',
    component: YoutubePageComponent,
  },
  {
    path: ':id',
    component: DetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
