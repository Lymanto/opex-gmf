import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { glAccountType, selectType } from 'src/app/lib/types';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';
import { KursUsdService } from 'src/app/services/opex/master-data/kurs-usd.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  userData: selectType[] = [];
  currentDate: string = format(new Date(), 'dd MMM yyyy');
  idNumber: string = '';
  console = console;

  itemsForm!: FormGroup;
  isDisplay: boolean = true;

  currentKurs!: number;

  selectGroupData: selectType[] = [];
  selectGroupDetail: selectType[] = [];
  available: number = 1500; //usd
  constructor(
    private users: GetAllUsersService,
    private fb: FormBuilder,
    private newRequest: NewRequestService,
    private kurs: KursUsdService
  ) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit() {
    this.users.getAllUsers().subscribe((response: any) => {
      this.refactorUser(response.body?.data);
    });
    this.itemsForm = this.fb.group({
      items: new FormArray([this.createItem]),
    });
    this.getCurrentKurs();
    this.fetchGlAccount();
  }
  refactorUser(data: any): selectType[] {
    data.forEach((element: any) => {
      this.userData.push({
        id: element.personalNumber,
        value: element.personalName,
      });
    });
    return this.userData;
  }

  getValue(val: any): void {
    this.idNumber = val.id;
    this.console.log('val :', val);
  }

  addItems(): void {
    (this.itemsForm.get('items') as FormArray).push(this.createItem);
  }

  removeItem(index: number): void {
    const itemsArray = this.itemsForm.get('items') as FormArray;
    if (itemsArray.length > 1) {
      itemsArray.removeAt(index);
    }
  }

  showDeleteButton(index: number): boolean {
    return index > 0;
  }

  get formControllers() {
    return this.itemsForm.controls;
  }
  get getItems() {
    return this.formControllers['items'] as FormArray;
  }
  get createItem(): FormGroup {
    return this.fb.group({
      GLNumberControl: new FormControl<string>(''),
      availableControl: new FormControl<number>(this.available),
      amountSubmissionControl: new FormControl<string>(''),
      periodStartControl: new FormControl<Date>(new Date()),
      periodFinishControl: new FormControl<Date>(new Date()),
      descriptionControl: new FormControl<string>(''),
      remarkControl: new FormControl<string>(''),
    });
  }

  getValueGL(val: any, index: number): void {
    this.getItems.controls[index].get('GLNumberControl')?.setValue(val.id);
  }
  getCurrentKurs() {
    return this.kurs
      .getLastKurs()
      .pipe(
        catchError((err) => {
          console.error('Error occurred', err);
          return EMPTY;
        }),
        tap((result: { data: any }) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            this.currentKurs = result.data.value;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  fetchGlAccount(): void {
    this.newRequest
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
  save(): void {
    this.console.log(this.itemsForm.value);
  }
}
