import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  
})
export class ButtonComponent {
  @Input() label: string = '';

  @Input() isHref: boolean = false;
  @Input() href: string = '';
  @Input() icon: string = '';

  @Input() type: string = '';
}
