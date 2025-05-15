import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutoFocusDirective implements OnChanges {
  @Input('appAutofocus') shouldFocus = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shouldFocus']?.currentValue) {
      queueMicrotask(() => this.el.nativeElement.focus());
    }
  }
}
