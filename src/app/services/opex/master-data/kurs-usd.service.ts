import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import { Observable, catchError, of } from 'rxjs';
import { kursType } from 'src/app/lib/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KursUsdService {
  private url = `${environment.baseUrlOpex}/kurs`;
  console = console;
  errorMessage: any;
  constructor(private httpClient: HttpClient) {}
  postKurs(kurs: kursType) {
    return this.httpClient
      .post<kursType>(this.url, kurs)
      .pipe(
        catchError((error: any): Observable<kursType> => {
          this.errorMessage = error.message;
          this.console.error('There was an error!', error);

          // after handling error, return a new observable
          // that doesn't emit any values and completes
          return of();
        })
      )
      .subscribe((data) => {
        this.console.log(data);
      });
  }
  getAllKurs() {
    return this.httpClient.get(this.url, {
      headers: {
        'x-api-key': environment.apiKey,
      },
    });
  }
}
