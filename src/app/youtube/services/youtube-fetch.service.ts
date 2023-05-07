import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable, switchMap } from 'rxjs';

import { IId, IItem } from '../models/search-item.model';
import { IResponse } from '../models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeFetchService {
  constructor(private http: HttpClient) {}

  getVideoList(searchString: string): Observable<IItem[]> {
    const response = !searchString
      ? this.http.get<IResponse>('/videos', {
          params: {
            part: 'snippet,statistics',
            chart: 'mostPopular',
            regionCode: 'BY',
            maxResults: '20',
          },
        })
      : this.http
          .get<IResponse>('/search', {
            params: {
              part: 'snippet',
              maxResults: '20',
              q: searchString,
            },
          })
          .pipe(
            switchMap(videoList => {
              const ids = videoList.items.map(item => (<IId>item.id).videoId);
              return this.http.get<IResponse>('/videos', {
                params: {
                  part: 'snippet,statistics',
                  id: ids,
                },
              });
            })
          );

    return response.pipe(map(res => res.items));
  }

  getSingleVideo(id: string): Observable<IItem> {
    return this.http
      .get<IResponse>('/videos', {
        params: {
          part: 'snippet,statistics',
          id: id,
        },
      })
      .pipe(map(res => res.items[0]));
  }
}
