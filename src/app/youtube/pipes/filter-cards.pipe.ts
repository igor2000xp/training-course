import { Pipe, PipeTransform } from '@angular/core';

import { filtersMap, IFilterSettings } from '../models/filters.model';
import { IItem } from '../models/search-item.model';

@Pipe({
  name: 'filterCards',
  pure: true,
})
export class FilterCardsPipe implements PipeTransform {
  private filterByDate(cards: IItem[], isReverse: boolean): IItem[] {
    const sortedCards: IItem[] = cards;

    if (!isReverse) {
      return sortedCards.sort((prev, next) => {
        return (
          new Date(next.snippet.publishedAt).getTime() -
          new Date(prev.snippet.publishedAt).getTime()
        );
      });
    } else {
      return sortedCards.sort((prev, next) => {
        return (
          new Date(prev.snippet.publishedAt).getTime() -
          new Date(next.snippet.publishedAt).getTime()
        );
      });
    }
  }

  private fiterByViews(cards: IItem[], isReverse: boolean): IItem[] {
    const sortedCards: IItem[] = cards;
    if (!isReverse) {
      return sortedCards.sort(
        (prev, next) => +next.statistics.viewCount - +prev.statistics.viewCount
      );
    }

    return sortedCards.sort(
      (prev, next) => +prev.statistics.viewCount - +next.statistics.viewCount
    );
  }

  private sortByKeyWord(cards: IItem[], keyWord: string): IItem[] {
    if (!keyWord.trim()) {
      return cards;
    }
    const loCaseKeyWord: string = keyWord.trim().toLowerCase();

    return cards.filter(card => {
      function isIncludes(str: string): boolean {
        return str.toLowerCase().includes(loCaseKeyWord);
      }

      const onCheck: string[] = [
        card.snippet.title,
        card.snippet.description,
        card.snippet.channelTitle,
      ];

      return onCheck.some(isIncludes);
    });
  }

  public transform(cards: IItem[], settings: IFilterSettings): IItem[] {
    let filteredCards: IItem[];

    switch (settings.filterBy) {
      case filtersMap.date: {
        filteredCards = this.filterByDate(cards, settings.isReverse);
        break;
      }
      case filtersMap.view: {
        filteredCards = this.fiterByViews(cards, settings.isReverse);
        break;
      }
      default: {
        filteredCards = cards;
      }
    }

    return this.sortByKeyWord(filteredCards, settings.keyWord);
  }
}
