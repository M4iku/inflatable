import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Game} from '../../db/models/game.model';

@Component({
  selector: 'app-home-item-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './home-item-list.component.html',
  styleUrl: './home-item-list.component.scss'
})
export class HomeItemListComponent {
  @Input() game?: Game;
  @Output() clicked = new EventEmitter<Game>();

  toDetail() {
    this.clicked.emit(this.game);
  }
}
