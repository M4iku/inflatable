import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import {LocalDBService} from '../local-db.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  private store = 'games';

  constructor(private db: LocalDBService) {}

  addGame(game: Game) {
    return this.db.add<Game>(this.store, game);
  }

  getAllGames(): Promise<Game[]> {
    return this.db.getAll<Game>(this.store);
  }

  getGameCount(): Promise<number> {
    return this.db.count(this.store);
  }

  clearAll() {
    return this.db.clear(this.store);
  }
}
