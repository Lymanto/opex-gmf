import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import { ApprovalType } from 'src/app/lib/types';
import { RealizationDTO } from 'src/app/dto/request-verification.dto';
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
  ): Observable<HttpResult<ApprovalType[]>> {
    return this.httpClient.get<HttpResult<ApprovalType[]>>(
      `${this.url}/all/${personalNumber}?page=${page}&orderBy=desc${taReff}${requestNumber}${status}${statusTo}${typeOfLetter}${dinas}${entryDate}${entryDateTo}`
    );
  }
  getApprovalById(id: string): Observable<HttpResult<RealizationDTO[]>> {
    return this.httpClient.get<HttpResult<RealizationDTO[]>>(
      `${this.url}/${id}`
    );
  }
  getCountApproval(
    personalNumber: string | number
  ): Observable<HttpResult<string>> {
    return this.httpClient.get<HttpResult<string>>(
      `${this.url}/count/${personalNumber}`
    );
  }
  
}
