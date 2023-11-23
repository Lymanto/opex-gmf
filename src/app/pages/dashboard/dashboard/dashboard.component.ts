import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { selectType } from 'src/app/lib/types';
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
  meta!: any;
  show: boolean = false;
  activeId: string = 'not-active';
  page: number = 1;
  perPage: number = 10;
  years: string = '';
  requestNumber: string = '';
  status: string = '';
  type: string = '';
  dinas: string = '';
  statusType: string[] = ['OPEN', 'PROGRESS', 'CLOSED', 'REVISE', 'REJECT'];

  public needApproval: string = '100';
  constructor(private requestData: NewRequestService) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  dataYears: selectType[] = [
    {
      id: new Date().getFullYear(),
      value: new Date().getFullYear().toString(),
    },
    {
      id: new Date().getFullYear() - 1,
      value: (new Date().getFullYear() - 1).toString(),
    },
    {
      id: new Date().getFullYear() - 2,
      value: (new Date().getFullYear() - 2).toString(),
    },
  ];
  dataDinas: selectType[] = [
    {
      id: 'TA',
      value: 'TA',
    },
    {
      id: 'TD',
      value: 'TD',
    },
  ];
  dataStatus: selectType[] = [
    {
      id: 'REJECT',
      value: 'Reject',
    },
    {
      id: 'OPEN',
      value: 'Open',
    },
    {
      id: 'CLOSE',
      value: 'Close',
    },
    {
      id: 'REVISE',
      value: 'Revise',
    },
    {
      id: 'PROGRESS',
      value: 'Progress',
    },
  ];
  dataType: selectType[] = [
    {
      id: 'UANG_MUKA',
      value: 'Uang Muka',
    },
    {
      id: 'PENGADAAN',
      value: 'Pengadaaan',
    },
    {
      id: 'QUALITY',
      value: 'Quality',
    },
    {
      id: 'FACILITY',
      value: 'Facility',
    },
    {
      id: 'ICT',
      value: 'ICT',
    },
    {
      id: 'ENTERTAINMENT',
      value: 'Entertainment',
    },
    {
      id: 'REIMBURSEMENT',
      value: 'Reimbursement',
    },
  ];
  ngOnInit(): void {
    this.needApproval;
    this.getDataTable();
    this.getDataPercentage();
  }
  createArray(lastPage: number, page: number, long: number) {
    const arr = [];
    for (let i = 0; i < long; i++) {
      arr.push(page + i);
    }
    return arr;
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
  resetFilter(): void {
    this.years = '';
    this.requestNumber = '';
    this.status = '';
    this.type = '';
    this.dinas = '';
    this.getDataTable();
  }
  onChangeYears(val: any) {
    this.years = val.id;
    this.getDataTable();
  }
  onChangeType(val: any) {
    this.type = val.id;
    this.getDataTable();
  }
  onChangeDinas(val: any) {
    this.dinas = val.id;
    this.getDataTable();
  }
  onChangeStatus(val: any) {
    this.status = val.id;
    this.getDataTable();
  }
  onChangeRequestNumber(val: string) {
    this.requestNumber = val;
    this.getDataTable();
  }
  onPageChange(page: number) {
    this.page = page;
    // this.createArray(this.meta.last_page, this.page, 3);
    console.log('page ', this.page);
    this.getDataTable();
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
      .getAllRealization(
        this.page,
        this.perPage,
        `${this.years != '' ? '&years=' + this.years : ''}`,
        `${
          this.requestNumber != '' ? '&requestNumber=' + this.requestNumber : ''
        }`,
        `${this.status != '' ? '&status=' + this.status : ''}`,
        `${this.type != '' ? '&type=' + this.type : ''}`,
        `${this.dinas != '' ? '&dinas=' + this.dinas : ''}`
      )
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
            console.log(this.meta);
            console.log(this.data);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
}
