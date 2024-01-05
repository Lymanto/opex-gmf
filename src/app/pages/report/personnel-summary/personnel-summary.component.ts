import { Component } from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import {
  personalSummaryDataTypes,
  personalSummaryTypes,
  selectType,
} from 'src/app/lib/types';
import { CostCenterService } from 'src/app/services/opex/cost-center/cost-center.service';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { ReportService } from 'src/app/services/opex/report/report.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';

@Component({
  selector: 'app-personnel-summary',
  templateUrl: './personnel-summary.component.html',
  styleUrls: ['./personnel-summary.component.css'],
})
export class PersonnelSummaryComponent {
  isFilterActive: boolean = true;
  dataDinas: selectType[] = [];
  userInfo: UserDataDTO = <UserDataDTO>{};
  page: number = 1;
  perPage: number = 10;
  totalSubmissionValue: number = 0;
  status: string = '';
  statusTo: string = '';
  dinas: string = '';
  requestBy: string = '';
  responsibleOfRequest: string = '';
  data!: personalSummaryDataTypes[];
  meta: {
    lastpage: number;
    totalItemsPerPage: number;
    totalItems: number;
    currentPage: number;
  } = {
    lastpage: 0,
    totalItemsPerPage: 0,
    totalItems: 0,
    currentPage: 0,
  };
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
  type: string = '';
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
  statusType: string[] = ['OPEN', 'PROGRESS', 'CLOSED', 'REVISE', 'REJECT'];
  activeId: string = 'not-active';
  years: string = '';
  month: string = '';
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
  onClick(value: string) {
    if (this.activeId == 'not-active') {
      this.activeId = value;
    } else if (this.activeId != value) {
      this.activeId = value;
    } else {
      this.activeId = 'not-active';
    }
  }
  checkStatus(value: string): boolean {
    if (this.statusType.includes(value)) {
      return true;
    }
    return false;
  }
  constructor(
    private costCenter: CostCenterService,
    private report: ReportService
  ) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.getDinas();
    this.getPersonalSummary();
  }
  resetFilter(): void {
    this.years = '';
    this.month = '';
    this.status = '';

    this.dinas = '';
    this.type = '';
    this.requestBy = '';
    this.responsibleOfRequest = '';
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeYears(val: any) {
    this.years = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeMonth(val: any) {
    this.month = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeDinas(val: any) {
    this.dinas = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeStatus(val: any) {
    this.status = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeType(val: any) {
    this.type = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onPageChange(page: number) {
    this.page = page;
    // this.createArray(this.meta.last_page, this.page, 3);
    this.getPersonalSummary();
  }

  getDinas() {
    this.costCenter
      .getDinas()
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects

            this.dataDinas = this.refactorDinas(result.data);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  refactorDinas(data: string[]): selectType[] {
    return data.map((item) => {
      return {
        id: item,
        value: item,
      };
    });
  }
  formatDate(val: Date): string {
    return format(new Date(val), 'dd MMM yyyy');
  }
  getPersonalSummary() {
    this.report
      .getPersonalSummaryByFilter(
        this.page,
        `${this.dinas != '' ? '&dinas=' + this.dinas : ''}`,
        `${this.month != '' ? '&month=' + this.month : ''}`,
        `${this.years != '' ? '&years=' + this.month : ''}`,
        `${this.type != '' ? '&type=' + this.type : ''}`,
        `${this.status != '' ? '&status=' + this.status : ''}`,

        `${this.requestBy != '' ? '&requestBy=' + this.requestBy : ''}`,
        `${
          this.responsibleOfRequest != ''
            ? '&responsibleOfRequest=' + this.responsibleOfRequest
            : ''
        }`
      )
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            const allData = result.data.data;
            const meta = result.meta;
            this.meta = meta;
            this.totalSubmissionValue = result.data.totalSubmissionValue;
            this.data = allData;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
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
}
