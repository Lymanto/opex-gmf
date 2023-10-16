import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() isAsk: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() value: string = '';
  @Input() type: string = '';
}
