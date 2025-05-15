import {Injectable} from '@angular/core';
import {ClientService} from '../../db/services/client.service';
import {Client, ClientStatus} from '../../db/models/client.model';
import {Game} from '../../db/models/game.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private clientService: ClientService) {
  }

  async addClient(name: string, initial: number, game: Game) {
    try {
      const client: Client = {
        name,
        gameName: game.name,
        gameId: +`${game.id}`,
        totalAmount: game.initialValue * initial,
        totalSecondsPaid: (game.baseMinutes * initial) * (60),
        status: "waiting",
        createdAt: Date.now()
      };
      const rs = await this.clientService.add(client);

      return {type: 'success', data: rs};
    } catch (error) {
      console.error('Error al crear el juego', error);
      return {type: 'error'};
    }
  }

  async updateClientStatus(id: number, status: ClientStatus) {
    switch (status) {
      case 'playing':
        return await this.clientService.setPlayingStatus(id);
      case 'cancelled':
        return null;
      case 'finished':
        return null;
      default:
        return null;
    }
  }

  async loadClients(id: number) {
    const rs = await this.clientService.getAllByGameId(id);
    return {type: 'success', data: rs};
  }
}
