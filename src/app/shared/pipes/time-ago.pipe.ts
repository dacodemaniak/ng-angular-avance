import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';
import { map, take } from 'rxjs/operators';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  constructor(
    private httpClient: HttpClient
  ) {}

  transform(value: Date, ...args: unknown[]): Observable<string> {
    return this.httpClient.get<any>(
      'http://worldclockapi.com/api/json/utc/now'
    ).pipe(
      take(1),
      map((result: any) => {
        const currentDateTime = moment(result.currentDateTime);
        const createdAt = moment(value);

        // Retourner la différence entre currentDateTime et createdAt en heures
        const diff = currentDateTime.diff(createdAt, 'hour');
        if (diff === 0) {
          return 'A l\'instant';
        }
        return `Crée il y a ${diff} heures`;
      })
    );
  }

}
