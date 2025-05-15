import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {DBConfig, provideIndexedDb} from 'ngx-indexed-db';
import { provideServiceWorker } from '@angular/service-worker';
import {provideAnimations} from '@angular/platform-browser/animations';

const dbConfig: DBConfig = {
  name: 'inflatableDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'clients',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'gameName', keypath: 'gameName', options: { unique: false } },
        { name: 'gameId', keypath: 'gameId', options: { unique: false } },
        { name: 'totalAmount', keypath: 'totalAmount', options: { unique: false } },
        { name: 'totalSecondsPaid', keypath: 'totalSecondsPaid', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
        { name: 'startedAt', keypath: 'startedAt', options: { unique: false } },
        { name: 'endedAt', keypath: 'endedAt', options: { unique: false } },
        { name: 'finishAt', keypath: 'finishAt', options: { unique: false } },
        { name: 'cancelledAt', keypath: 'cancelledAt', options: { unique: false } },
        { name: 'status', keypath: 'status', options: { unique: false } },
        { name: 'gameId_status', keypath: ['gameId', 'status'], options: { unique: false } }
      ]
    }
    ,
    {
      store: 'games',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: true } },
        { name: 'minMinutes', keypath: 'minMinutes', options: { unique: false } },
        { name: 'minAmount', keypath: 'minAmount', options: { unique: false } },
        { name: 'pricePerMinute', keypath: 'pricePerMinute', options: { unique: false } },
        { name: 'maxChildren', keypath: 'maxChildren', options: { unique: false } },
      ]
    }
  ]
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(routes), provideIndexedDb(dbConfig), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })]
};
