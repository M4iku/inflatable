import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalDBService {
  constructor(private db: NgxIndexedDBService) {}

  add<T>(store: string, item: T): Promise<T & { id: number }> {
    return firstValueFrom(this.db.add<T>(store, item));
  }

  update<T>(store: string, item: T): Promise<T> {
    return firstValueFrom(this.db.update<T>(store, item));
  }

  delete(store: string, id: number): Promise<unknown[]> {
    return firstValueFrom(this.db.delete(store, id));
  }

  getById<T>(store: string, id: number): Promise<T> {
    return firstValueFrom(this.db.getByKey<T>(store, id));
  }

  getAll<T>(store: string): Promise<T[]> {
    return firstValueFrom(this.db.getAll<T>(store));
  }

  clear(store: string): Promise<void> {
    return firstValueFrom(this.db.clear(store));
  }

  count(store: string): Promise<number> {
    return firstValueFrom(this.db.count(store));
  }
}
