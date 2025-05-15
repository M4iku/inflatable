import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../../../components/ui/input/input.component';
import {ButtonComponent} from '../../../../components/ui/button/button.component';
import {Game} from '../../../../db/models/game.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-game-form',
  imports: [
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    NgIf
  ],
  standalone: true,
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameFormComponent implements OnInit {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() initialData?: Game
  @Output() submitted = new EventEmitter<{type: string, data: Game}>();
  gameForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      baseMinutes: [null, [Validators.required, Validators.min(1)]],
      initialValue: [null, [Validators.required, Validators.min(0)]],
      minuteValue: [null, [Validators.required, Validators.min(0)]],
      capacity: [null, [Validators.required, Validators.min(1)]],
    });
    if (this.initialData) {
      this.gameForm.patchValue(this.initialData);
    }
  }

  async submitForm() {
    if (this.gameForm.valid && this.gameForm) {
      const game = {...this.initialData, ...this.gameForm.value};
      this.submitted.emit({type: this.mode, data: game});
    }
  }

  async deleteSubmit() {
    const game = {...this.initialData, ...this.gameForm.value};
    this.submitted.emit({type: 'delete', data: game});
  }
}
