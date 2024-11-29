import { IRowActions } from './i-row-actions.interface';

// TODO fix configuration organization
export interface IMatTableColumn<T> {
  key: string;
  header: string; // TODO Observable<string>
  actions?: IRowActions<T>;
  cell?: (element: T) => string;
  custom?: boolean;
  template?: string;
  // hoverCss?: string; // TODO add
  // sticky?: boolean; // TODO add
  // pinned?: 'left' | 'right' // TODO add
  // sortable?: SortColumn; // TODO add <!-- TODO sort header only if sort field exists on configuration -->
  // width?: string; // TODO add
  // columnResize?: string; /// TODO add
}

// TODO add
// interface SortColumn {
//   sortProp: 'asc' | 'desc';
// }
