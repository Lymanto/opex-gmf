import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RealizationUpdateDto } from 'src/app/dto/approve.dto';
import { HttpResult } from 'src/app/dto/http-result.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApproveService {
  private url = `${environment.baseUrlOpex}/approval/approve`;
  constructor(private httpClient: HttpClient) {}

  updateStatus(body : RealizationUpdateDto ):Observable<HttpResult<RealizationUpdateDto[]>>{
    return this.httpClient.post<any>(`${this.url}`,body 
    )
  }
}
