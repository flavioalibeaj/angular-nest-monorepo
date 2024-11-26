import { ThemePalette } from '@angular/material/core';
import { TooltipPosition } from '@angular/material/tooltip';

export interface IRowButton<T, RT = void> {
  text: string; // TODO Observable<string>
  clickEvent: (rowData: T) => RT;
  type?: 'mini-fab' | 'icon';
  icon?: string;
  color?: ThemePalette;
  iconColor?: ThemePalette;
  class?: string; // TODO try
  tooltip?: string; // TODO Observable<string>
  tooltipPosition?: TooltipPosition;
  disabled?: (rowData: T) => boolean;
  hide?: (rowData: T) => boolean;
}
