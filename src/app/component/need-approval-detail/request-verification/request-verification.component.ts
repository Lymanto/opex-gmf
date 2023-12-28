import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { RealizationDTO } from 'src/app/dto/request-verification.dto';
import { ApprovalService } from 'src/app/services/opex/need-approval/approval.service';
import { RequestVerificationService } from 'src/app/services/opex/need-approval/request-verification.service';

@Component({
  selector: 'app-request-verification',
  templateUrl: './request-verification.component.html',
  styleUrls: ['./request-verification.component.css'],
})
export class RequestVerificationComponent implements OnInit {
  @Input() data!: RealizationDTO;
  constructor(
    private approval: ApprovalService
  ) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    console.log(this.data);
  }
  formatDate(val: Date): string {
    return format(new Date(val), 'dd MMM yyyy');
  }

  getApprovalById(id: string) {
    this.approval
      .getApprovalById(id)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result) {
            // Ensure result.data is a single array of glAccountType objects

            this.data = result.realization;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  updateDataStatusId(){
    
  }  
}
