import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import {
  glAccountType,
  selectType,
  tableBodyRkapType,
} from 'src/app/lib/types';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';

@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.css'],
})
export class ViewBudgetComponent {
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

  constructor(private fb: FormBuilder, private service: NewRequestService) {}

  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.fetchGlAccount();
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
}
