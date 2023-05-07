import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { IItem } from 'src/app/youtube/models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() public item!: IItem;

  private maxTitleLength = 50;

  public title!: string;

  public stats!: Array<{ icon: string; value: string }>;

  public ngOnInit(): void {
    if (!this.item) {
      return;
    }
    this.stats = [
      { icon: 'visibility', value: this.item?.statistics?.viewCount },
      { icon: 'thumb_up_alt', value: this.item?.statistics?.likeCount },
      { icon: 'thumb_down_alt', value: this.item?.statistics?.dislikeCount },
      { icon: 'mode_comment', value: this.item?.statistics?.commentCount },
    ];
    this.title = this.checkTitle(this.item?.snippet?.title);
  }

  public checkTitle(title: string): string {
    if (title.length > this.maxTitleLength) {
      return `${title.slice(0, this.maxTitleLength)}...`;
    }
    return title;
  }

  public goToDetails(): void {
    this.router.navigate(['/home', this.item.id]);
  }
}
