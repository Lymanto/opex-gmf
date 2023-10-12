import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() label: string = '';
  @Input() id: string = '';

  @Input() hasIcon: boolean = true;
  @Input() isHref: boolean = false;
  @Input() href: string = '';
  @Input() icon: string = '';

  @Input() type: string = '';
}
