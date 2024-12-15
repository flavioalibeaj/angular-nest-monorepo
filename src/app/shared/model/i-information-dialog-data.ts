import { Observable } from 'rxjs';

export interface IInformationDialogData {
  cardTitle: Observable<string>;
  cardText: Observable<string>;
  cardTitleIcon: string;
  saveButtonText?: Observable<string>;
  cancelButtonText?: Observable<string>;
  saveButtonIcon?: string;
  cancelButtonIcon?: string;
  hideSaveButton?: boolean;
}
