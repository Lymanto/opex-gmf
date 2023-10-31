import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetAllUsersService {
  private url = `${environment.baseUrl}/v1/employee?page=1&perPage=100&orderColumn=personalName&orderBy=asc`;
  constructor(private httpClient: HttpClient) {}
  getAllUsers() {
    return this.httpClient.get(this.url, {
      headers: {
        'x-api-key': environment.apiKey,
      },
    });
  }
}
