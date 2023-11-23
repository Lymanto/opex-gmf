import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import {
  HttpResultSoeAllUser,
  HttpResultSoeSpesificUser,
} from 'src/app/dto/http-result.dto';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetAllUsersService {
  private url = `${environment.baseUrlSoe}/v2/employee`;
  localStorageService: any;
  constructor(private httpClient: HttpClient) {}
  getAllUsers(): Observable<HttpResultSoeAllUser<any[]>> {
    return this.httpClient.get<HttpResultSoeAllUser<any[]>>(
      `${this.url}?page=1&perPage=99999&orderColumn=personalName&orderBy=asc`,
      {
        headers: {
          'x-api-key': environment.apiKey,
        },
      }
    );
  }
  getSpecificUsers(id: number): Observable<HttpResultSoeAllUser<any>> {
    return this.httpClient.get<HttpResultSoeAllUser<any>>(`${this.url}/${id}`, {
      headers: {
        'x-api-key': environment.apiKey,
      },
      params: {
        superior: true,
      },
    });
  }

  getPersonalInformationFromCache(): UserDataDTO | null {
    if (localStorage.getItem(LocalServiceConst.USER_INFO)) {
      return JSON.parse(
        this.localStorageService.getData(
          LocalServiceConst.USER_INFO
        ) as unknown as string
      ) as UserDataDTO;
    } else {
      return null;
    }
  }
  getDetailUsers(
    id: string
  ): Observable<HttpResultSoeSpesificUser<UserDataDTO>> {
    return this.httpClient.get<HttpResultSoeSpesificUser<UserDataDTO>>(
      `${this.url}/${id}`,
      {
        headers: {
          'x-api-key': environment.apiKey,
        },
        params: {
          superior: true,
        },
      }
    );
  }
}
