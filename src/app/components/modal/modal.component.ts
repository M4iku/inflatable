import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
    trigger('backdropFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 0.5 })),
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0 })),
      ]),
    ])
  ]
})
export class ModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();

  zIndex = 10000;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.zIndex = this.getHighestZIndexInDOM() + 1;
  }

  onClose() {
    this.close.emit();
  }

  private getHighestZIndexInDOM(): number {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('body *'));
    let highest = 0;

    for (const el of elements) {
      const style = window.getComputedStyle(el);
      const z = style.zIndex;
      if (z !== 'auto') {
        const val = Number(z);
        if (!isNaN(val)) highest = Math.max(highest, val);
      }
    }

    return highest;
  }
}
