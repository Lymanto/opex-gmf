import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { EMPTY, Subject, catchError, mergeMap, takeUntil, tap } from 'rxjs';
import { glAccountType } from 'src/app/lib/types';
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
  allGroupData: glAccountType[] = [];
  constructor(private fb: FormBuilder, private service: NewRequestService) {}

  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.itemsForm = this.fb.group({
      items: new FormArray([this.createItem]),
    });
    console.log('test');

    this.fetchGroupData();
  }

  fetchGroupData(): void {
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
            this.allGroupData = result.data.flatMap((item) => item); // Convert array of arrays to a single array
            console.log(this.allGroupData);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  addItems(): void {
    (this.itemsForm.get('items') as FormArray).push(this.createItem);
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
  // Fungsi yang dipanggil saat terjadi perubahan di select box
  onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = parseInt(target.value, 10);

    this.selectedItem = this.allGroupData.find(
      (item) => item.idGlAccount === selectedValue
    );
  }

  getValue(val: any): void {
    this.glAccount = val.glAccount;
    this.console.log('val :', val);
  }
}
