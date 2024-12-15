import { TemplateRef } from '@angular/core';
import { IRowActions } from './i-row-actions.interface';
import { Observable } from 'rxjs';

// TODO fix configuration organization
export interface IMatTableColumn<T = unknown> {
  key: string;
  header: string | Observable<string>;
  actions?: IRowActions<T>;
  cell?: (element: T) => string;
  custom?: boolean;
  customTemplate?: string;
  customTemplateRef?: TemplateRef<any>; // TODO add config
  sortOptions?: SortColumnOptions;
  // sticky?: boolean; // TODO add
  // pinned?: 'left' | 'right' // TODO add
  // width?: string; // TODO add
  // columnResize?: string; /// TODO add
}

interface SortColumnOptions {
  sortable?: boolean;
  sortOnBack?: boolean; // TODO add functionality
}
