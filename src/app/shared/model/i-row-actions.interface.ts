import { ThemePalette } from '@angular/material/core';
import { IRowButton } from './i-row-button.interface';

export interface IRowActions<T> {
  isMenu?: boolean;
  menuButtonColor?: ThemePalette;
  menuIconColor?: ThemePalette;
  buttons: IRowButton<T>[];
}
