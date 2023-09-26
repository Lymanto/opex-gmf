import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
 headers = ["No","No. of Request","Entry Date","Dinas","Status","Type of Submission","Status To","Department To","Submission Value","Action"];
}
