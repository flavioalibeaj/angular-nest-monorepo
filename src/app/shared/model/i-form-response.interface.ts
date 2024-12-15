export interface IFormResponse<T = unknown> {
  submitted?: boolean;
  formData?: T;
}
