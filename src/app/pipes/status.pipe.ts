import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';
    const map: Record<string, string> = {
      waiting: 'Esperando',
      playing: 'Jugando',
      finished: 'Finalizado',
      cancelled: 'Cancelado'
    };

    return map[value] || value;
  }
}

