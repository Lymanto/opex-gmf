import { Component, Input, OnInit } from '@angular/core';
import { ActivationEnd } from '@angular/router';
import { tableBodyRkapType } from 'src/app/lib/types';

export const tabledata = [
  {
    src: 'assets/images/icons/ic-arrow-down.svg',
    srcactive: 'assets/images/icons/ic-arrow-up-active.svg',
  },
];

@Component({
  selector: 'app-view-budget-table',
  templateUrl: './view-budget-table.component.html',
  styleUrls: ['./view-budget-table.component.css'],
})
export class ViewBudgetTableComponent {
  tabledata = tabledata;
  @Input() body!: tableBodyRkapType[];

  headers: string[] = [
    'Financial Indicator',
    'G/L Number',
    'Total',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];

  activeId: string = 'not-active';

  onClick(value: string) {
    if (this.activeId == 'not-active') {
      this.activeId = value;
    } else if (this.activeId != value) {
      this.activeId = value;
    } else {
      this.activeId = 'not-active';
    }
  }
}
