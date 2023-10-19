import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetAllUsersService {
  private url =
    'https://api.gmf-aeroasia.co.id/th/soe/v1/employee?page=1&perPage=10&orderColumn=personalName&orderBy=asc';
  constructor(private httpClient: HttpClient) {}
  getAllUsers() {
    return this.httpClient.get(this.url, {
      headers: {
        'x-api-key': '343C-ED0B-4137-B27E',
      },
    });
  }
}
