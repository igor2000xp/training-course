import { IItem } from './search-item.model';

export interface IResponse {
  [x: string]: unknown;
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: IItem[];
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}
