import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
})
export class InputDateComponent {
  @Input() label:string = '';
  @Input() id:string = '';
  @Input() placeholder:string = '';
  @Input() required:boolean = false;
  @Input() isAsk:boolean = false;

  focus = false;
}
