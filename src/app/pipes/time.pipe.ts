import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value?: number): unknown {
    if (value === undefined) return '';
    return (new Date(value)).toLocaleTimeString('es-CL');
  }

}
