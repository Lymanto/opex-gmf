import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import { CostCenterType } from 'src/app/lib/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CostCenterService {
  private url = `${environment.baseUrlOpex}/m-cost-center/bidang`;

  constructor(private httpClient: HttpClient) {}

  getCostCenterByBidang(
    bidang: string
  ): Observable<HttpResult<CostCenterType[]>> {
    return this.httpClient.get<HttpResult<CostCenterType[]>>(
      `${this.url}/${bidang}`
    );
  }
}
