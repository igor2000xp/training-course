import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-stats',
  templateUrl: './item-stats.component.html',
  styleUrls: ['./item-stats.component.scss'],
})
export class ItemStatsComponent implements OnInit {
  @Input() public icon!: string;

  @Input() public value!: string;

  public ngOnInit(): void {
    this.value = this.convertValue(this.value);
  }

  convertValue(value: string): string {
    const [m, k] = [1000000, 1000];
    if (+value > m) {
      return `${Math.floor(+value / m)}M`;
    }
    if (+value > k) {
      return `${Math.floor(+value / k)}K`;
    }
    return value;
  }
}
