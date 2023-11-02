import { Component, Input } from '@angular/core';
import { Flowbite } from 'src/app/lib/flowbite';
import { kursType, selectType } from 'src/app/lib/types';
import { KursUsdService } from 'src/app/services/opex/master-data/kurs-usd.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
@Flowbite()
export class ModalComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() hasIcon: boolean = true;
  @Input() isHref: boolean = false;
  @Input() href: string = '';
  @Input() icon: string = '';
  @Input() type: string = '';
}
