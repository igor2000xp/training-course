import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import responseExample from 'src/app/shared/data/response-example';

import { IItem } from '../models/search-item.model';
import { IResponse } from '../models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export class CardsCollectionService {
  private responce: IResponse = responseExample;

  private cards$ = new BehaviorSubject<IItem[]>([]);

  private cards: IItem[] = this.responce.items;

  public getCards(): IItem[] {
    return this.cards;
  }

  public findById(id: string): IItem | null {
    return this.cards.find(card => card.id === id) || null;
  }

  public getCardsStream(): BehaviorSubject<IItem[]> {
    return this.cards$;
  }
}
