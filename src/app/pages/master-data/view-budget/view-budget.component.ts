import { Component } from '@angular/core';
import { tableBodyRkapType } from 'src/app/lib/types';

@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.css'],
})
export class ViewBudgetComponent {
  tableBody: tableBodyRkapType[] = [
    {
      id: '1',
      financialIndicators: 'Company Accommodation',
      glNumber: '-',
      total: '579.32',
      jan: '579.32',
      feb: '579.32',
      mar: '579.32',
      apr: '579.32',
      mei: '579.32',
      jun: '579.32',
      jul: '579.32',
      agu: '579.32',
      sep: '579.32',
      okt: '579.32',
      nov: '579.32',
      des: '579.32',
    },
    {
      id: '2',
      financialIndicators: 'Staff Expenses',
      glNumber: '-',
      total: '579.32',
      jan: '579.32',
      feb: '579.32',
      mar: '579.32',
      apr: '579.32',
      mei: '579.32',
      jun: '579.32',
      jul: '579.32',
      agu: '579.32',
      sep: '579.32',
      okt: '579.32',
      nov: '579.32',
      des: '579.32',
    },
  ];
}
