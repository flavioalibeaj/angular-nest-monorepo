import { IRowActions } from './i-row-actions.interface';

// TODO fix configuration organization
export interface IMatTableColumn<T = unknown> {
  key: string;
  header: string; // TODO Observable<string>
  actions?: IRowActions<T>;
  cell?: (element: T) => string;
  custom?: boolean;
  customTemplate?: string;
  sortOptions?: SortColumnOptions;
  // hoverCss?: string; // TODO add
  // sticky?: boolean; // TODO add
  // pinned?: 'left' | 'right' // TODO add
  // width?: string; // TODO add
  // columnResize?: string; /// TODO add
}

interface SortColumnOptions {
  sortable?: boolean;
  sortOnBack?: boolean; // TODO add functionality
}
