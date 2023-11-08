import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import { glAccountType } from 'src/app/lib/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewRequestService {
  private url = `${environment.baseUrlOpex}/m-gl-account`;

  private readonly headers = new HttpHeaders().set(
    'x-api-key',
    '343C-ED0B-4137-B27E'
  );

  constructor(private httpClient: HttpClient) {}

  getAllGroup(): Observable<HttpResult<glAccountType[]>> {
    return this.httpClient.get<HttpResult<glAccountType[]>>(this.url, {
      headers: this.headers,
    });
  }
}
