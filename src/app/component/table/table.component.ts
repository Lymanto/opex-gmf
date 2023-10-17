import { Component, Input } from '@angular/core';
import { ActivationEnd } from '@angular/router';

export const tabledata = [
  {
    src: 'assets/images/icons/ic-arrow-down.svg',
    srcactive: 'assets/images/icons/ic-arrow-up-active.svg',
  },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  tabledata = tabledata;
  headers = [
    'No',
    'No. of Request',
    'Entry Date',
    'Dinas',
    'Status',
    'Type of Submission',
    'Status To',
    'Department To',
    'Submission Value',
    'Action',
  ];

  head = [
    'No',
    'Document Name',
    'Doc. Type',
    'Size',
    'Upload by',
    'Department by',
    'Upload Date',
    'Action',
  ];

  kursheaders = ['No.', 'Years', 'Value (IDR)', 'Action'];

  masterdatasummaryheaders = [
    'Action',
    'Financial Indicators',
    'Budget (MTD)',
    'Actual (MTD)',
    'Achievment (MTD)',
    'Budget (YTD)',
    'Actual (YTD)',
    'Achievment (YTD)',
  ];

  reallocationbudgetgeneralheaders = [
    'No',
    'Ta Reff',
    'Type Of Reallocation',
    'No. of Request',
    'Entry Date',
    'Status',
    'Status To',
    'Department To',
    'Action',
  ];

  reallocationcorporateheaders = [
    'No',
    'Entry Date',
    'Dinas',
    'TA Reff',
    'Amount Submission Total',
    'Status',
    'Status To',
    'Department To',
    'Action',
  ];

  personalsummaryheaders = [
    'No',
    'Dinas',
    'Month',
    'Years',
    'No Of Request',
    'Type Of Submission',
    'Submission Value (USD)',
    'Status',
    'Request by',
    'Responsible of Request',
    'Action',
  ];

  show: boolean = false;

  onclick() {
    this.show = !this.show;
  }

  @Input() type!: string;
  @Input() dashboardtable: string = '';
  @Input() createnewrequesttable: string = '';
  @Input() kursusdtable: string = '';
  @Input() masterdatasummarytable: string = '';
  @Input() reallocationbudgetgeneraltable: string = '';
  @Input() personalsummarytable: string = '';
  @Input() reallocationcorporatetable: string = '';
}
