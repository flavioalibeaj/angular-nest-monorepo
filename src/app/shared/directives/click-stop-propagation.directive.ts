import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[click-stop-propagation]',
})
export class ClickStopPropagationDirective {
  @HostListener('click', ['$event'])
  onClick = (event: Event) => event.stopPropagation();
}
