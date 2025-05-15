import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'danger' | 'secondary' = 'primary';
  @Input() fullWidth = true;
  @Input() disabled = false;
  @Output() click = new EventEmitter<Event>();

  get classes(): string {
    const base =
      'py-2 px-4 transition text-center text-base font-semibold shadow-md rounded-lg ' +
      'focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
      'transition-transform duration-100 ease-in-out active:scale-95';

    const width = this.fullWidth ? 'w-full' : '';

    const variants: Record<string, string> = {
      primary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 focus:ring-offset-gray-200',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 focus:ring-offset-red-200',
      secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400 focus:ring-offset-gray-100'
    };

    const disabledStyle = this.disabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : '';

    return `${base} ${variants[this.variant]} ${width} ${disabledStyle}`;
  }

  handleClick(event: Event) {
    if (!this.disabled) {
      this.click.emit(event);
    }
  }
}
