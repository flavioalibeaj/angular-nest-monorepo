import { IRowActions } from './i-row-actions.interface';

export interface IMatTableColumn<T> {
  key: string;
  header: string; // TODO Observable<string>
  actions?: IRowActions<T>;
  cell?: (element: T) => string;
  custom?: boolean;
  template?: string;
  // pinned?: 'left' | 'right' // TODO add
  // sortable?: SortColumn // TODO add
}

// interface SortColumn {
//   sortProp: 'asc' | 'desc';
// }
