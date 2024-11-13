import { Component } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, SidenavComponent],
  styles: [
    `
      .main-div {
        // display: flex;
        // flex-direction: column;
        height: 100%;
        // height: 100vh;
        overflow: hidden;
      }

      /*
      app-toolbar {
        flex: 0 0 auto;
      }
      */

      // app-sidenav {
      //   /*
      //   flex: 1 1 auto;
      //   */
      //   flex: auto;
      //   overflow: auto;
      // }
    `,
  ],
  template: `
    <div class="main-div">
      <app-toolbar />
      <app-sidenav />
    </div>
  `,
})
export class HomeComponent {}
