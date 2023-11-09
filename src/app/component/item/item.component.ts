import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { glAccountType, selectType } from 'src/app/lib/types';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  console = console;
  itemsForm!: FormGroup;
  isDisplay: boolean = true;
  glAccount: string = '';
  NewRequestService: any;
  selectedItem: any;
  formGroup: any;
  groupGl: any;
  glNumber!: number;
  selectGroupData: selectType[] = [];
  selectGroupDetail: selectType[] = [];

  constructor(private fb: FormBuilder, private service: NewRequestService) {}

  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.itemsForm = this.fb.group({
      items: new FormArray([this.createItem]),
    });
    console.log('test');

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
      budget: [new FormControl<string>('', Validators.required)],
      group: [new FormControl<string>('', Validators.required)],
      groupDetailControl: [new FormControl<string>('', Validators.required)],
      GLDetailControl: [new FormControl<string>('', Validators.required)],
      availableControl: [new FormControl<string>('', Validators.required)],
      amountSubmissionControl: [
        new FormControl<string>('', Validators.required),
      ],
    });
  }

  getGlGroup(val: any): void {}

  getValue(val: any): void {
    this.glNumber = val.id;
    this.console.log('val :', val);
  }
}
