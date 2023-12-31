import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import { Observable, catchError, of } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import { UploadRKAP, kursType } from 'src/app/lib/types';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ViewBudgetService {
  private url = `${environment.baseUrlOpex}/budget`;
  constructor(private httpClient: HttpClient) {}

  postRKAP(rkap: FormData) {
    return this.httpClient.post<any>(`${this.url}/upload`, rkap);
  }
}
