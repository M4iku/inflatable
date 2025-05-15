import { Injectable } from '@angular/core';
import {Game} from '../../db/models/game.model';
import {GameService} from '../../db/services/game.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private readonly gameService: GameService) { }

  async createGame(game: Game): Promise<{type: string, data?: Game}> {
    try {
      const result = await this.gameService.addGame(game);
      return {type: 'success', data: result};
    } catch (error) {
      console.error('Error al crear el juego', error);
      return {type: 'error'};
    }
  }

  async loadGames() {
    return await this.gameService.getAllGames();
  }

  async updateGame(game: Game) {
    const result = await this.gameService.editGame(game);
    return {type: 'success', data: result};
  }

  async deleteGame(id: number) {
    const result = await this.gameService.deleteGame(id);
    return {type: 'success', data: result};
  }
}
