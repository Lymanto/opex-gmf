import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  @Input() status!:
    | 'Open'
    | 'Progress'
    | 'Closed'
    | 'Revise'
    | 'Reject'
    | string
    | undefined;
  statusClass!: string;
  ngOnInit() {
    this.setColor();
  }
  setColor(): void {
    switch (this.status) {
      case 'Open': {
        this.statusClass =
          ' border-tertiary-br-red text-tertiary-tx-red bg-tertiary-bg-red ';
        break;
      }
      case 'Progress': {
        this.statusClass =
          ' border-tertiary-br-blue text-tertiary-tx-blue bg-tertiary-bg-blue ';
        break;
      }
      case 'Closed': {
        this.statusClass =
          ' border-tertiary-br-green text-tertiary-tx-green bg-tertiary-bg-green ';
        break;
      }
      case 'Revise': {
        this.statusClass =
          ' border-tertiary-br-tosca text-tertiary-tx-tosca bg-tertiary-bg-tosca ';
        break;
      }
      case 'Reject': {
        this.statusClass =
          ' border-tertiary-br-gold text-tertiary-tx-gold bg-tertiary-bg-gold ';
        break;
      }
    }
  }
}
