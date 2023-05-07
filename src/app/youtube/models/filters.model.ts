export interface IFilterSettings {
  placeholder?: string;
  keyWord: string;
  isReverse: boolean;
  filterBy: Filters;
}

export interface IFilters {
  [key: string]: Filters;
}

export type Filters = 'NONE' | 'VIEW' | 'DATE';

export const filtersMap: IFilters = {
  date: 'DATE',
  view: 'VIEW',
  none: 'NONE',
};
