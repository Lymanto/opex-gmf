import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  @Input() currentUrl: string = '';
  @Input() currentUrlSubMenu: string = '';
  @Input() needApproval: string = '50';
}
