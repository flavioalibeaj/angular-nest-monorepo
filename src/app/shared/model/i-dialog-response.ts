export interface IDialogResponse<T = unknown> {
  submitted?: boolean;
  formData?: T;
}
