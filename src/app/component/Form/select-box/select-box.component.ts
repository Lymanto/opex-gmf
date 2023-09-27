import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css'],
})
export class SelectBoxComponent {
  @Input() label = '';
  @Input() id = '';
  @Input() data = [];
}
