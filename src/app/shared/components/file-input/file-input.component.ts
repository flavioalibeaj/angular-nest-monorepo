import { Component } from '@angular/core';

// TODO
@Component({
  selector: 'file-input',
  imports: [],
  template: `
    <!-- <div [class]="input().containerClass"></div> -->
    <!-- <button type="button" mat-raised-button (click)="fileInput.click()">{{"FORM.chooseFile" | translate}}</button>
  <input hidden (change)="onFileSelected($event)" #fileInput type="file">
  <span class="ms-3">{{selectedFile?.name}}</span> -->
  `,
})
export class FileInputComponent {
  // TODO
  // selectedFile: any = null;
  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files;
  //   console.log(this.selectedFile);
  // }
}
