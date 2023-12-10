import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import {
  glAccountType,
  selectType,
  tableBodyRkapType,
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
  yearsSelected!: number;
  currentYear: string = format(new Date(), 'yyyy');
  isUploadSuccess: boolean = false;
  isUploadError: boolean = false;
  uploadError: string = '';
  uploadedFile: File | null = null;
  userInfo: UserDataDTO = <UserDataDTO>{};
  fileSize: string = '';
  dataRKAP: any = [];
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
  tableBody: tableBodyRkapType[] = [
    {
      id: '1',
      financialIndicators: 'Company Accommodation',
      glNumber: '-',
      total: '579.32',
      jan: '579.32',
      feb: '579.32',
      mar: '579.32',
      apr: '579.32',
      mei: '579.32',
      jun: '579.32',
      jul: '579.32',
      agu: '579.32',
      sep: '579.32',
      okt: '579.32',
      nov: '579.32',
      des: '579.32',
    },
    {
      id: '2',
      financialIndicators: 'Staff Expenses',
      glNumber: '-',
      total: '579.32',
      jan: '579.32',
      feb: '579.32',
      mar: '579.32',
      apr: '579.32',
      mei: '579.32',
      jun: '579.32',
      jul: '579.32',
      agu: '579.32',
      sep: '579.32',
      okt: '579.32',
      nov: '579.32',
      des: '579.32',
    },
  ];
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
      .subscribe(
        (result) => {
          this.dataRKAP = result.data;
          console.log('result', this.dataRKAP);
        },
        (error) => {
          console.log('error', error);
        }
      );
  }
  generateSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }
}
