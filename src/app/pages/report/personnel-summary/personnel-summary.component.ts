import { Component } from '@angular/core';

@Component({
  selector: 'app-personnel-summary',
  templateUrl: './personnel-summary.component.html',
  styleUrls: ['./personnel-summary.component.css'],
})
export class PersonnelSummaryComponent {
  isFilterActive: boolean = true;
  public needApproval: string = '100';
  ngOnInit(): void {
    this.needApproval;
  }
}
