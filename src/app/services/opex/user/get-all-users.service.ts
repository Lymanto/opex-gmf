import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResultSoe } from 'src/app/dto/http-result.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetAllUsersService {
  private url = `${environment.baseUrlSoe}/v2/employee`;
  constructor(private httpClient: HttpClient) {}
  getAllUsers(): Observable<HttpResultSoe<any[]>> {
    return this.httpClient.get<HttpResultSoe<any[]>>(
      `${this.url}?page=1&perPage=99999&orderColumn=personalName&orderBy=asc`,
      {
        headers: {
          'x-api-key': environment.apiKey,
        },
      }
    );
  }
  getSpecificUsers(id: number): Observable<HttpResultSoe<any>> {
    return this.httpClient.get<HttpResultSoe<any>>(`${this.url}/${id}`, {
      headers: {
        'x-api-key': environment.apiKey,
      },
      params: {
        superior: true,
      },
    });
  }
}
