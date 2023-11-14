import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { Flowbite } from 'src/app/lib/flowbite';
import {
  documentCategoryType,
  newRequestType,
  selectType,
} from 'src/app/lib/types';
import { DocumentCategoryService } from 'src/app/services/opex/document-category/document-category.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
@Flowbite()
export class ModalComponent implements OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() isHref: boolean = false;
  @Input() href: string = '';
  @Input() icon: string = '';
  @Input() type: string = '';
  yearsSelected!: number;
  console = console;
  currentYear: string = format(new Date(), 'yyyy');
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

  constructor() {}

  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.generateYears();
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
