import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isFilterActive: boolean = true;
  data!: any[];
  dataPercentage!: any[];
  meta!: {};
  show: boolean = false;
  activeId: string = 'not-active';
  page: number = 1;
  perPage: number = 10;
  statusType: string[] = ['OPEN', 'PROGRESS', 'CLOSED', 'REVISE', 'REJECT'];
  public needApproval: string = '100';
  constructor(private requestData: NewRequestService) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.needApproval;
    this.getDataTable();
    this.getDataPercentage();
  }
  checkStatus(value: string): boolean {
    if (this.statusType.includes(value)) {
      return true;
    }
    return false;
  }
  onShowDetail(value: string) {
    if (this.activeId == 'not-active') {
      this.activeId = value;
    } else if (this.activeId != value) {
      this.activeId = value;
    } else {
      this.activeId = 'not-active';
    }
  }
  formatDate(val: Date): string {
    return format(new Date(val), 'dd MMM yyyy');
  }

  getDataPercentage() {
    this.requestData
      .getPercentage()
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result && result.data) {
            this.dataPercentage = result.data;
            console.log(this.dataPercentage);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  getDataTable() {
    this.requestData
      .getAllRealization(this.page, this.perPage)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            const allData = result.data.flatMap((item: any) => item);
            const meta = result.meta;
            this.meta = meta;
            this.data = allData;
            console.log(this.data);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
}
