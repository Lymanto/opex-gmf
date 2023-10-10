import { Component, Input } from '@angular/core';
import { ActivationEnd } from '@angular/router';

export const tabledata = [
  {
    src: 'assets/images/icons/ic-arrow-down.svg',
    srcactive: 'assets/images/icons/ic-arrow-up-active.svg',
  }
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})



export class TableComponent {

  tabledata = tabledata;


  headers = ["No", "No. of Request", "Entry Date", "Dinas", "Status", "Type of Submission", "Status To", "Department To", "Submission Value", "Action"];

  head = ["No", "Document Name", "Doc. Type", "Size", "Upload by", "Department by", "Upload Date", "Action"];

  show: boolean = false

  onclick() {
    this.show = !this.show
  }

  @Input() dashboardtable: string = '';
  @Input() createnewrequesttable: string = '';
}
