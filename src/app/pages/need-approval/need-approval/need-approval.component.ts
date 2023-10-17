import { Component } from '@angular/core';

@Component({
  selector: 'app-need-approval',
  templateUrl: './need-approval.component.html',
  styleUrls: ['./need-approval.component.css'],
})
export class NeedApprovalComponent {
  isFilterActive: boolean = true;
  public needApproval: string = '100';
  ngOnInit(): void {
    this.needApproval;
  }
}
