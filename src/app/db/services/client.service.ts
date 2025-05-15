import { Injectable } from '@angular/core';
import {LocalDBService} from '../local-db.service';
import {Client} from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private store = 'clients';

  constructor(private db: LocalDBService) {}

  add(client: Client) {
    return this.db.add<Client>(this.store, client);
  }

  getAll() {
    return this.db.getAll<Client>(this.store);
  }

  async getAllByGameId(gameId: number): Promise<Client[]> {
    const waiting = await this.db.getAllByIndex<Client>(
      this.store,
      'gameId_status',
      IDBKeyRange.only([gameId, 'waiting'])
    );

    const playing = await this.db.getAllByIndex<Client>(
      this.store,
      'gameId_status',
      IDBKeyRange.only([gameId, 'playing'])
    );

    return [...waiting, ...playing];
  }

  async setPlayingStatus(id: number) {
    const client = await this.db.getById<Client>(this.store, id);
    if (!client) return;

    client.startedAt = Date.now();
    client.endedAt = client.startedAt + (client.totalSecondsPaid * 1000);
    client.status = 'playing';

    return await this.db.update(this.store, client);
  }

  update(client: Client) {
    return this.db.update<Client>(this.store, client);
  }

  delete(id: number) {
    return this.db.delete(this.store, id);
  }
}
