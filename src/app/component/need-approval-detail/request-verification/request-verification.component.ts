import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { RequestVerificationService } from 'src/app/services/opex/need-approval/request-verification.service';

@Component({
  selector: 'app-request-verification',
  templateUrl: './request-verification.component.html',
  styleUrls: ['./request-verification.component.css'],
})
export class RequestVerificationComponent {
  id: number;
  constructor(
    private requestVerification: RequestVerificationService,
    private readonly route: ActivatedRoute
  ) {
    const _id: number = parseInt(
      this.route.snapshot.paramMap.get('id') as string
    );
    this.id = _id;
  }
  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  ngOnInit() {
    this.fetchRequestVerification();
  }

  fetchRequestVerification(): void {
    this.requestVerification
      .getRequestVerification(this.id)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          if (result && result.data) {
            const allData = result.data.flatMap((item) => item);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
}
