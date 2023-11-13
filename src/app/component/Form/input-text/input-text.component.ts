import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor {
  _inputText = '';
  @Input() available!: number; //usd
  @Input() currentKurs!: number;
  amountSubmission!: number;

  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() isAsk: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() value: string | number | undefined = '';
  @Input() type: string = '';
  console = console;
  @Output() currentValue: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('currentPair') pair!: ElementRef;
  currentPair: string = 'USD';
  errorMessage!: string;
  isError: boolean = false;
  remainingMessage!: string;
  isRemaining: boolean = false;
  onChangePair(): void {
    this.currentPair = this.pair.nativeElement.value;
    this.console.log(this.currentPair);
  }

  getValue(event: any): void {
    this.currentValue.emit(event.target.value);
  }
  onChangeAmountSubmission(event: any): void {
    if (this.currentPair === 'USD') {
      this.amountSubmission = this.available - event.target.value;
    } else {
      this.amountSubmission =
        this.available - event.target.value / this.currentKurs;
    }
    if (this.amountSubmission < 0) {
      this.isError = true;
      this.errorMessage = 'Your request overlimit budget';
      this.isRemaining = false;
    } else {
      this.isError = false;
      this.isRemaining = true;
      this.remainingMessage = `${this.amountSubmission} USD`;
    }
  }

  get text(): string {
    return this._inputText;
  }

  set text(value: string) {
    this._inputText = value;
    this.propagateChange(this._inputText);
  }

  writeValue(value: string) {
    if (value !== undefined) {
      this.text = value;
    }
  }

  propagateChange = (_: any) => {};
  propagateTouched = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }

  touched($event: any) {
    this.propagateTouched($event);
  }
}
