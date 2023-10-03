import { Component } from '@angular/core';

@Component({
  selector: 'app-table-create-request',
  templateUrl: './table-create-request.component.html',
  styleUrls: ['./table-create-request.component.css']
})
export class TableCreateRequestComponent {


  headers = ["No", "Document Name", "Doc. Type", "Size", "Upload by", "Deparment by", "Upload Date","Action"];

}
