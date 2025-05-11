import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({ providedIn: 'root' })
export class LocalDBService {
  constructor(private db: NgxIndexedDBService) {}

  add<T>(store: string, item: T) {
    return this.db.add<T>(store, item);
  }

  update<T>(store: string, item: T) {
    return this.db.update<T>(store, item);
  }

  delete(store: string, id: number) {
    return this.db.delete(store, id);
  }

  getById<T>(store: string, id: number) {
    return this.db.getByKey<T>(store, id);
  }

  getAll<T>(store: string) {
    return this.db.getAll<T>(store);
  }

  clear(store: string) {
    return this.db.clear(store);
  }
}
