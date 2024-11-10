import { Component } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, SidenavComponent],
  template: `
    <app-toolbar />
    <app-sidenav />
  `,
})
export class HomeComponent {}
