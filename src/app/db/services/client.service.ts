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

  update(client: Client) {
    return this.db.update<Client>(this.store, client);
  }

  delete(id: number) {
    return this.db.delete(this.store, id);
  }
}
