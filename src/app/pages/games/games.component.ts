import { Component } from '@angular/core';
import {GameListItemComponent} from '../../components/game-list-item/game-list-item.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';
import {GameFormComponent} from './components/game-form/game-form.component';
import {Game} from '../../db/models/game.model';
import {GamesService} from './games.service';

@Component({
  selector: 'app-games',
  imports: [
    GameListItemComponent,
    NgIf,
    GameFormComponent,
    NgForOf
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
  animations: [
    trigger('slidePages', [
      transition('list => add', [
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
          ], { optional: true })
        ])
      ]),
      transition('list => edit', [
        group([
          query(':enter', [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            animate('300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
          ], { optional: true })
        ])
      ]),
      transition('add => list', [
        group([
          query(':enter', [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            animate('300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
          ], { optional: true })
        ])
      ]),
      transition('edit => list', [
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
          ], { optional: true })
        ])
      ])
    ])
  ]


})
export class GamesComponent {
  currentView: 'list' | 'add' | 'edit' = 'list';
  list: Game[] = [];
  currentGame?: Game;

  constructor(private readonly gService: GamesService) {
    gService.loadGames().then(rs => {
      this.list = rs;
    });
  }

  goToAdd() {
    this.currentView = 'add';
  }

  goToEdit(game: Game) {
    this.currentGame = game;
    this.currentView = 'edit';
  }

  goBack() {
    this.currentGame = undefined;
    this.currentView = 'list';
  }

  async createGame(game: {type: string, data: Game}) {
    if (game && game.type === 'add') {
      const { type, data } = await this.gService.createGame(game.data);
      if (type === 'success' && data) {
        this.list.push(data);
        this.goBack();
      } else {

      }
    }
  }

  async editGame(game: {type: string, data: Game}) {
    if (game && game.type === 'edit') {
      const { type, data } = await this.gService.updateGame(game.data);
      if (type === 'success' && data) {
        let gameListItem = this.list.find(x => x.id === data.id);
        if (gameListItem) { Object.assign(gameListItem, data); }
        this.goBack();
      } else {

      }
    } else if (game.type === 'delete') {
      const { type, data } = await this.gService.deleteGame(+`${game.data.id}`);
      if (type === 'success' && data) {
        this.list = this.list.filter(x => x.id !== game.data.id);
        this.goBack();
      } else {

      }
    }
  }
}
