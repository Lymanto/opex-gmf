import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  of,
  takeUntil,
  tap,
} from 'rxjs';
import { kursType, selectType } from 'src/app/lib/types';
import { KursUsdService } from 'src/app/services/opex/master-data/kurs-usd.service';

@Component({
  selector: 'app-kurs-usd',
  templateUrl: './kurs-usd.component.html',
  styleUrls: ['./kurs-usd.component.css'],
})
export class KursUsdComponent implements OnInit {
  yearsSelected!: number;
  inputValue!: number;
  tableData!: kursType[];
  currentYear: string = format(new Date(), 'yyyy');
  console = console;
  errorMessage: any;

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

  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  constructor(private kurs: KursUsdService) {}
  generateYears(): void {
    for (let i = 1; i <= 10; i++) {
      this.yearsData.push({
        id: (parseInt(this.currentYear) - i).toString(),
        value: (parseInt(this.currentYear) - i).toString(),
      });
    }
  }
  getValueSelectBox(val: any): void {
    this.yearsSelected = parseInt(val.id);
  }
  getValueInputText(val: string): void {
    this.inputValue = parseInt(val);
  }
  kursAddPost(years: number, value: number, createdBy: string): void {
    this.kurs
      .postKurs({
        years,
        value,
        createdBy,
      })
      .pipe(
        catchError((error: any): Observable<kursType> => {
          this.errorMessage = error.message;
          this.console.error('There was an error!', error);
          return of();
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe(
        (data: kursType) => {
          this.console.log('data', data);
          this.getKurs();
        },
        (error: any) => {
          this.console.error('Error', error);
        }
      );
  }
  getKurs() {
    return this.kurs
      .getAllKurs()
      .pipe(
        catchError((err) => {
          console.error('Error occurred', err);
          return EMPTY;
        }),
        tap((result: { data: any[] }) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            this.tableData = result.data.flatMap((item) => item); // Convert array of arrays to a single array
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  ngOnInit() {
    this.generateYears();
    this.getKurs();
  }
}
