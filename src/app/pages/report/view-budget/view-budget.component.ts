import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import {
  CostCenterType,
  RKAPType,
  glAccountType,
  selectType,
} from 'src/app/lib/types';
import { CostCenterService } from 'src/app/services/opex/cost-center/cost-center.service';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { ViewBudgetService } from 'src/app/services/opex/master-data/view-budget.service';
import { ReportService } from 'src/app/services/opex/report/report.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.css'],
})
export class ViewBudgetComponent implements OnInit {
  data: any = [];
  months: string[] = [
    'JANUARI',
    'FEBRUARI',
    'MARET',
    'APRIL',
    'MEI',
    'JUNI',
    'JULI',
    'AGUSTUS',
    'SEPTEMBER',
    'OKTOBER',
    'NOVEMBER',
    'DESEMBER',
  ];

  yearsSelected: number = new Date().getFullYear();
  currentYear: string = format(new Date(), 'yyyy');
  userInfo: UserDataDTO = <UserDataDTO>{};
  dataRKAP: RKAPType[] = [];
  isDisplayRkap: boolean = true;
  isDisplayRemaining: boolean = true;
  isDisplayActual: boolean = true;
  activeId: string | number = 'not-active';
  costCenterData: CostCenterType | null = <CostCenterType>{};
  personalUnit!: string;
  headers: string[] = [
    'Financial Indicator',
    'G/L Number',
    'Total',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];

  yearsData: selectType[] = [
    {
      id: (parseInt(this.currentYear) + 1).toString(),
      value: (parseInt(this.currentYear) + 1).toString(),
    },
    {
      id: this.currentYear,
      value: this.currentYear,
    },
  ];
  generateYears(): void {
    for (let i = 1; i <= 1; i++) {
      this.yearsData.push({
        id: (parseInt(this.currentYear) - i).toString(),
        value: (parseInt(this.currentYear) - i).toString(),
      });
    }
  }
  getValueSelectBox(val: any): void {
    this.yearsSelected = parseInt(val.id);
    this.getRKAP();
  }
  selectGroupData: selectType[] = [];
  selectGroupDetail: selectType[] = [];

  constructor(
    private service: NewRequestService,
    private viewBudget: ReportService,
    private users: GetAllUsersService,
    private costCenter: CostCenterService,
    private readonly localStorageService: LocalStorageService
  ) {}

  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.fetchGlAccount();
    this.generateYears();
    this.getUserInfo();
  }

  async getUserInfo(): Promise<void> {
    if (!this.users.getPersonalInformationFromCache()) {
      try {
        let _data = await this.users.getUserInfo();
        this.userInfo = _data;
      } catch {
        Swal.fire({
          title: 'Alert!',
          html: 'failed to get user info',
          // icon: 'success',
          confirmButtonColor: '#276BC5',
        });
      }
    } else {
      let _userInfo: any = {
        ...this.localStorageService.getData(LocalServiceConst.USER_INFO),
      };
      this.userInfo = JSON.parse(_userInfo?._result);
      this.generateDinas(this.userInfo?.personalUnit);
    }
  }
  getCostCenter(bidang: string): void {
    this.costCenter
      .getCostCenterByBidang(bidang)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          if (result) {
            this.costCenterData = result.data[0] as unknown as CostCenterType;
            this.getRKAP();
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  generateDinas(dinas: string): void {
    this.personalUnit = dinas.slice(0, 2);
    this.getCostCenter(this.personalUnit);
  }

  fetchGlAccount(): void {
    this.service
      .getAllGroup()
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            const allData = result.data.flatMap((item) => item); // Convert array of arrays to a single array
            const filteredData: glAccountType[] = allData.reduce(
              (accumulator: any, current: any) => {
                if (
                  !accumulator.find(
                    (item: any) => item.groupGl === current.groupGl
                  )
                ) {
                  accumulator.push(current);
                }
                return accumulator;
              },
              []
            );

            this.refactorSelectGroupData(filteredData);
            this.refactorSelectGroupDetail(filteredData);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getRKAP(): void {
    this.dataRKAP = [];
    this.viewBudget
      .getBudgetByFilter(
        this.yearsSelected.toString(),
        `&costCenter=${this.costCenterData?.dinas}`
      )
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            const allData = result.data.flatMap((item) => item); // Convert array of arrays to a single array
            this.dataRKAP = allData;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  refactorSelectGroupData(data: glAccountType[]): void {
    data.forEach((element: glAccountType) => {
      this.selectGroupData.push({
        id: element.glAccount,
        value: element.groupGl,
      });
    });
  }
  refactorSelectGroupDetail(data: glAccountType[]): void {
    data.forEach((element: glAccountType) => {
      this.selectGroupDetail.push({
        id: element.glAccount,
        value: element.groupDetail,
      });
    });
  }

  onClick(value: string | number) {
    if (this.activeId == 'not-active') {
      this.activeId = value;
    } else if (this.activeId != value) {
      this.activeId = value;
    } else {
      this.activeId = 'not-active';
    }
  }
}
