import { Component, Input, OnInit } from '@angular/core';
import { Flowbite } from 'src/app/lib/flowbite';
import { format } from 'date-fns';
import { selectType } from 'src/app/lib/types';

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
  yearsSelected!: number;
  console = console;
  currentYear: string = format(new Date(), 'yyyy');
  yearsData: selectType[] = [
    {
      id: (parseInt(this.currentYear) + 1).toString(),
      value: (parseInt(this.currentYear) + 1).toString(),
    },
    {
      id: this.currentYear,
      value: this.currentYear,
    },
  ];
  generateYears(): void {
    for (let i = 1; i <= 10; i++) {
      this.yearsData.push({
        id: (parseInt(this.currentYear) - i).toString(),
        value: (parseInt(this.currentYear) - i).toString(),
      });
    }
  }
  getValueSelectBox(val: any): void {
    this.yearsSelected = parseInt(val.id);
  }
  ngOnInit() {
    this.generateYears();
  }
}
