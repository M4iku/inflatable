import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Game} from '../../db/models/game.model';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-game-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './game-list-item.component.html',
  styleUrl: './game-list-item.component.scss'
})
export class GameListItemComponent {
  @Output() editGame = new EventEmitter<Game>();
  @Input() game: Game | undefined;

  editGameOnClick() {
    this.editGame.emit(undefined);
  }
}
