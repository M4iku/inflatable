import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-game-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './game-list-item.component.html',
  styleUrl: './game-list-item.component.scss'
})
export class GameListItemComponent {

}
