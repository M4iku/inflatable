import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
  AfterViewInit,
  Injector, ChangeDetectorRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule
} from '@angular/forms';
import { NgIf } from '@angular/common';
import {AutoFocusDirective} from '../../../directives/autofocus.directive';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, AutoFocusDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() id = '';
  @Input() label = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() focus: boolean = false;

  value = '';
  touched = false;
  disabled = false;
  control: NgControl | null = null;

  constructor(private injector: Injector, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.id) {
      this.id = this.name || this.label.toLowerCase().replace(/\s+/g, '-');
    }
  }

  ngAfterViewInit(): void {
    // Resolvemos el ciclo después de la creación del componente
    Promise.resolve().then(() => {
      this.control = this.injector.get(NgControl, null);
      if (this.control) {
        this.control.valueAccessor = this;
      }
    });
  }

  writeValue(val: string): void {
    this.value = val || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  onBlur() {
    this.touched = true;
    this.onTouched();
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  get showError(): boolean {
    return !!this.control?.control && this.control.control.invalid && (this.control.control.touched || this.control.control.dirty);
  }

  get firstError(): string | null {
    const errors = this.control?.control?.errors;
    if (!errors) return null;
    const errorKey = Object.keys(errors)[0];
    const error = errors[errorKey];

    const messages: Record<string, string> = {
      required: 'Este campo es obligatorio.',
      minlength: `Debe tener al menos ${error?.requiredLength} caracteres.`,
      maxlength: `No debe exceder ${error?.requiredLength} caracteres.`,
      email: 'Debe ser un correo electrónico válido.',
    };

    return messages[errorKey] || 'Campo inválido';
  }
}
