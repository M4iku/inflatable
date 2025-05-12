import { Component } from '@angular/core';
import {GameListItemComponent} from '../../components/game-list-item/game-list-item.component';

@Component({
  selector: 'app-games',
  imports: [
    GameListItemComponent
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {

}
