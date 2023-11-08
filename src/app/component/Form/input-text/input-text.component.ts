import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent implements OnChanges {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() isAsk: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() value: string = '';
  @Input() type: string = '';
  @Output() currentValue: EventEmitter<string> = new EventEmitter<string>();
  getValue(event: any): void {
    this.currentValue.emit(event.target.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['value'] &&
      changes['value']?.previousValue != changes['value']?.currentValue
    ) {
      console.log('table content change => ', this.value);
    }
  }
}
