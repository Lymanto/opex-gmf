import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import {
  RealizationUpdateDto,
  UpdateRealizationDto,
} from 'src/app/dto/approve.dto';
import { RealizationDTO } from 'src/app/dto/request-verification.dto';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { ApprovalService } from 'src/app/services/opex/need-approval/approval.service';
import { RequestVerificationService } from 'src/app/services/opex/need-approval/request-verification.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-verification',
  templateUrl: './request-verification.component.html',
  styleUrls: ['./request-verification.component.css'],
})
export class RequestVerificationComponent implements OnInit {
  @Input() data!: RealizationDTO;
  localStorageService: any;
  idApproval!: number | null | string;
  userInfo: any;
  objectRole: any;
  userRole: string = '';
  dataResponsibleNoPeg!: UserDataDTO;
  dataPersonalNumberTo!: UserDataDTO;
  constructor(
    private approval: ApprovalService,
    private users: GetAllUsersService
  ) {
    this.localStorageService = new LocalStorageService();
  }
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.objectRole = this.localStorageService.getData(LocalServiceConst.ROLE);
    this.userRole = this.objectRole._result;
    console.log(this.userRole);

    this.getResponsibleNoPegDetail(this.data.responsibleNopeg);
    this.getPersonalNumberToDetail(this.data.personalNumberTo);
  }
  formatDate(val: Date): string {
    return format(new Date(val), 'dd MMM yyyy');
  }
  getResponsibleNoPegDetail(noPeg: string): void {
    this.users
      .getDetailUsers(noPeg)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((res) => {
          this.dataResponsibleNoPeg = res.body;
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getPersonalNumberToDetail(noPeg: string): void {
    this.users
      .getDetailUsers(noPeg)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((res) => {
          this.dataPersonalNumberTo = res.body;
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  updateDataStatusId() {
    this.userInfo = this.localStorageService.getData(
      LocalServiceConst.USER_INFO
    );
    const userData = JSON.parse(this.userInfo._result); // buat data menjadi object
    console.log(userData);
    const object: RealizationUpdateDto = {
      idRealization: this.idApproval,
      updateRealizationDto: {
        status: this.data.statusId >= 6 ? 'PROGRESS' : 'OPEN',
        statusId: this.data.statusId + 1,
        statusToId: this.data.statusToId + 1,
        updatedBy: userData.personalNumber,
      },
      approvalDto: {
        name: userData.personalName,
        jabatan: userData.personalJob,
        unit: userData.personalUnit,
        remark: null,
      },
    };
    console.log(object);
    this.approval
      .updateStatus(object)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          Swal.fire({
            title: 'Alert!',
            html: 'failed to upload data',
            icon: 'error',
            confirmButtonColor: '#276BC5',
          });
          return EMPTY;
        }),
        tap(() => {
          Swal.fire({
            title: 'Alert!',
            html: 'Success',
            icon: 'success',
            confirmButtonColor: '#276BC5',
          }).then(() => window.location.reload());
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
}
