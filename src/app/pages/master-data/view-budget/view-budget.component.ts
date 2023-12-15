import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import {
  glAccountType,
  selectType,
  tableBodyRkapType,
  viewBudgetUploadType,
} from 'src/app/lib/types';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';
import { ViewBudgetService } from 'src/app/services/opex/master-data/view-budget.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.css'],
})
export class ViewBudgetComponent implements OnInit {
  simulatedData: any = [];
  simulatedArrayData: any[] = [];
  data: any = [];
  percentageNumber: number = 1;
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

  yearsSelected!: number;
  currentYear: string = format(new Date(), 'yyyy');
  isUploadSuccess: boolean = false;
  isUploadError: boolean = false;
  uploadError: string = '';
  uploadedFile: File | null = null;
  userInfo: UserDataDTO = <UserDataDTO>{};
  fileSize: string = '';
  dataRKAP: any = [];
  isDisplayRkap: boolean = true;
  isDisplayRemaining: boolean = true;
  isDisplayActual: boolean = true;
  activeId: string | number = 'not-active';
  renderer: any;
  @Input() body!: viewBudgetUploadType[];

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
  }
  tableBody: viewBudgetUploadType[] = [];
  NewRequestService: any;
  selectGroupData: selectType[] = [];
  selectGroupDetail: selectType[] = [];

  constructor(
    private service: NewRequestService,
    private viewBudget: ViewBudgetService,
    private users: GetAllUsersService,
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
          confirmButtonColor: '#1F569D',
        });
      }
    } else {
      let _userInfo: any = {
        ...this.localStorageService.getData(LocalServiceConst.USER_INFO),
      };
      this.userInfo = JSON.parse(_userInfo?._result);
    }
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
  uploadFile(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.uploadedFile = fileInput.files[0];
    }
    if (this.uploadedFile) {
      const bytes = this.uploadedFile.size;
      const maxSize = 1048576; // 1 MB limit
      if (bytes > maxSize) {
        this.fileSize = 'File size exceeds the maximum limit of 1 MB';
        this.isUploadError = true;
        this.uploadError =
          'Upload error, file size exceeds the maximum limit of 1 MB';
        this.isUploadSuccess = false;
      } else {
        this.fileSize = this.generateSize(bytes);
        this.isUploadError = false;
        this.isUploadSuccess = true;
      }
    } else {
      console.warn('No file selected.');
    }
  }
  saveRKAP(): void {
    if (this.uploadedFile === null || this.uploadedFile === undefined) {
      Swal.fire({
        title: 'Alert!',
        html: 'Please select file',
        icon: 'error',
        confirmButtonColor: '#1F569D',
      });
      return;
    }
    if (this.yearsSelected === undefined || this.yearsSelected === null) {
      Swal.fire({
        title: 'Alert!',
        html: 'Please select year',
        icon: 'error',
        confirmButtonColor: '#1F569D',
      });
      return;
    }
    let formData = new FormData();

    formData.append('years', this.yearsSelected.toString());
    formData.append('file', this.uploadedFile);
    formData.append('createdBy', this.userInfo?.personalNumber.toString());

    this.viewBudget
      .postRKAP(formData)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          Swal.fire({
            title: 'Alert!',
            html: 'failed to upload RKAP',
            icon: 'error',
            confirmButtonColor: '#1F569D',
          });
          return EMPTY;
        }),
        tap((result) => {
          if (result) {
            this.isUploadSuccess = true;
            this.isUploadError = false;
            this.uploadError = '';
            this.uploadedFile = null;
            this.fileSize = '';

            this.dataRKAP = result.data;
            console.log('result', this.dataRKAP);

            this.getSimulatedData(result.data);
            Swal.fire({
              title: 'Success!',
              html: 'RKAP uploaded successfully',
              icon: 'success',
              confirmButtonColor: '#1F569D',
            });
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  generateSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
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

  getSimulatedData(data: any) {
    const keysArray = Object.keys(data);
    keysArray.forEach((valkey) => {
      this.simulatedArrayData.push({
        [valkey]: [],
        ['total' + keysArray]:
          data['total' + keysArray] * this.percentageNumber,
      });
      this.simulatedData.valkey = {
        ['total' + keysArray]:
          data['total' + keysArray] * this.percentageNumber,
      }; // menambahkan objek keys pada data simulasi yg dibikin
      const nkeysArray = Object.keys(valkey);
      nkeysArray.forEach((valnkey) => {
        this.simulatedArrayData[valkey].push({
          ['total' + valkey]: data.valkey.nkey * this.percentageNumber,
          ['month' + valkey]: [],
        });
        this.simulatedData.valkey['total' + valnkey] =
          data.valkey.nkey * this.percentageNumber; // menambahkan total pada data simulasi yg dibikin
        this.months.forEach((month) => {
          this.simulatedArrayData[valkey]['month' + valkey].push({
            [month]:
              data.valkey.nkey['month' + valnkey]['month'] *
              this.percentageNumber,
          });
          this.simulatedData.valkey['month' + valnkey][month] =
            data.valkey.nkey['month' + valnkey]['month'] *
            this.percentageNumber;
        });
      });
    });
  }
}
