import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IItem } from '../../models/search-item.model';
import { Statistics } from '../../models/statistics.model';
import { YoutubeFetchService } from '../../services/youtube-fetch.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
  public item!: IItem;

  public id!: string;

  public publishTime!: Date;

  public statisticsMap!: Statistics[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private youtubeFetchService: YoutubeFetchService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.youtubeFetchService.getSingleVideo(this.id).subscribe(response => {
      if (!response) {
        this.router.navigate(['404']);
      }

      this.item = response;
      this.publishTime = new Date(this.item.snippet.publishedAt);
    });

    this.statisticsMap = [
      new Statistics('visibility', this.item?.statistics?.viewCount),
      new Statistics('thumb_up_alt', this.item?.statistics?.likeCount),
      new Statistics('thumb_down_alt', this.item?.statistics?.dislikeCount),
      new Statistics('mode_comment', this.item?.statistics?.commentCount),
    ];
  }

  public goBack(): void {
    this.location.back();
  }
}
