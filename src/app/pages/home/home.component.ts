import {Component} from '@angular/core';
import {GameListItemComponent} from "../../components/game-list-item/game-list-item.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {GamesService} from '../games/games.service';
import {Game} from '../../db/models/game.model';
import {HomeItemListComponent} from '../../components/home-item-list/home-item-list.component';
import {GameFormComponent} from '../games/components/game-form/game-form.component';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import {Client} from '../../db/models/client.model';
import {ModalComponent} from '../../components/modal/modal.component';
import {InputComponent} from '../../components/ui/input/input.component';
import {ButtonComponent} from '../../components/ui/button/button.component';
import {HomeService} from './home.service';
import {FormsModule} from '@angular/forms';
import {StatusPipe} from '../../pipes/status.pipe';
import {TimePipe} from '../../pipes/time.pipe';
@Component({
  selector: 'app-home',
  imports: [
    GameListItemComponent,
    NgForOf,
    HomeItemListComponent,
    GameFormComponent,
    NgIf,
    ModalComponent,
    InputComponent,
    ButtonComponent,
    FormsModule,
    StatusPipe,
    NgClass,
    TimePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeView', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent {
  currentView: 'list' | 'detail' = 'detail';
  list: Game[] = [];
  currentGame?: Game;
  clientList: Client[] = [];
  addClientModalState = false;
  clientName: string = '';
  m = false;
  constructor(private readonly gService: GamesService, private readonly hService: HomeService) {
    gService.loadGames().then(rs => {
      this.list = rs;
      this.currentGame = rs[0];
      this.loadClients();
    });
  }

  loadClients() {
    if (this.currentGame && this.currentGame.id) {
      this.hService.loadClients(this.currentGame?.id).then(clients => {
        this.clientList = clients.data;
      })
    }
  }

  goList(): void {
    this.currentView = 'list';
  }

  goDetail(game: Game): void {
    this.currentGame = game;
    this.loadClients();
    this.currentView = 'detail';
  }

  addClientSection(): void {
    this.addClientModalState = true;
  }

  async addClient(initial: number) {
    if (this.clientName.replace(/\s+/g, '').length > 0 && this.currentGame) {
      await this.hService.addClient(this.clientName, initial, this.currentGame).then(rs => {
        this.loadClients();
        this.addClientModalState = false;
        this.clientName = '';
      });
    }
  }

  getStatusClass(client: Client) {
    const now = Date.now();

    if (client.status === 'waiting') {
      return 'bg-yellow-200';
    }
    if (client.status === 'playing') {
      if (client.endedAt && now > client.endedAt) {
        return 'bg-red-200';
      }
      return 'bg-green-200';
    }
    return '';
  }

  setPlaying(client: Client) {
    if (client && client.id) {
      this.hService.updateClientStatus(client.id, "playing").then(value => {
        console.log(value);
        this.loadClients();
      });
    }
  }

}
