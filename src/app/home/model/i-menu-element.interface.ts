export interface IMenuElement {
  name: string;
  icon: string;
  url: string;
  children?: IMenuElement[];
}
