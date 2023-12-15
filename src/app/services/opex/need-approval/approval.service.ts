import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  private url = `${environment.baseUrlOpex}/approval`;
  constructor(private httpClient: HttpClient) {}
  getAllApproval(
    personalNumber: string,
    page: number = 1,
    taReff?: string,
    requestNumber?: string,
    dinas?: string,
    typeOfLetter?: string,
    entryDate?: string,
    entryDateTo?: string,
    status?: string,
    statusTo?: string
  ): Observable<HttpResult<any[]>> {
    return this.httpClient.get<HttpResult<any[]>>(
      `${this.url}/all/530353?page=${page}&orderBy=desc${taReff}${requestNumber}${status}${statusTo}${typeOfLetter}${dinas}${entryDate}${entryDateTo}`
    );
  }
}
