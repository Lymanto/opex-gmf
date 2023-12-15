import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivationEnd } from '@angular/router';
import { tableBodyRkapType, viewBudgetUploadType } from 'src/app/lib/types';
import { ViewBudgetService } from 'src/app/services/opex/master-data/view-budget.service';

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
  isDisplayRkap: boolean = true;
  isDisplayRemaining: boolean = true;
  isDisplayActual: boolean = true;
  tabledata = tabledata;
  activeId: string | number = 'not-active';
  renderer: any;

  @Input() body!: viewBudgetUploadType[];

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

  constructor(private viewBudget: ViewBudgetService) {}

  onClick(value: string | number) {
    if (this.activeId == 'not-active') {
      this.activeId = value;
    } else if (this.activeId != value) {
      this.activeId = value;
    } else {
      this.activeId = 'not-active';
    }
  }
  getUploadFile(): void {
    const formData = new FormData();
    formData.append;
  }
}
