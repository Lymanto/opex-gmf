import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { KursUsdService } from 'src/app/services/opex/master-data/kurs-usd.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent {
  @Input() available: number = 15000; //usd
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() isAsk: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() value: string | number = '';
  @Input() type: string = '';
  @Output() currentValue: EventEmitter<string> = new EventEmitter<string>();
  constructor(private service: KursUsdService) {}
  kurs!: number;

  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  getKurs() {
    return this.service
      .getLastKurs()
      .pipe(
        catchError((err) => {
          console.error('Error occurred', err);
          return EMPTY;
        }),
        tap((result: { data: any }) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            this.kurs = result.data.value;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
}
