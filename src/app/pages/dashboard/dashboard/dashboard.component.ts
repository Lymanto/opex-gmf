import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isFilterActive: boolean = true;
  public needApproval: string = "100";
  ngOnInit(): void {
    this.needApproval
  }
}
