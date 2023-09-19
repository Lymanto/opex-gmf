import { Component, Input } from '@angular/core';

export const sidebarData = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    src: 'assets/images/icons/ic-dashboard.svg',
    srcActive: 'assets/images/icons/ic-dashboard-active.svg',
    subMenu: [],
  },
  {
    path: '/request',
    title: 'Request',
    src: 'assets/images/icons/ic-request.svg',
    srcActive: 'assets/images/icons/ic-request-active.svg',
    subMenu: [],
  },
  {
    path: '/need-approval',
    title: 'Need Approval',
    src: 'assets/images/icons/ic-approval.svg',
    srcActive: 'assets/images/icons/ic-approval-active.svg',
    subMenu: [],
  },
  {
    path: '/reallocation-budget',
    title: 'Reallocation Budget',
    src: 'assets/images/icons/ic-reallocation.svg',
    srcActive: 'assets/images/icons/ic-reallocation-active.svg',
    subMenu: [],
  },
  {
    path: '/report',
    title: 'Report',
    src: 'assets/images/icons/ic-report.svg',
    srcActive: 'assets/images/icons/ic-report-active.svg',
    subMenu: [
      {
        path: '/summary',
        title: 'Summary',
      },
      {
        path: '/view-budget',
        title: 'View Budget',
      },
      {
        path: '/personnel-summary',
        title: 'Personnel Summary',
      },
    ],
  },
  {
    path: '/guidance-application',
    title: 'Guidance Application',
    src: 'assets/images/icons/ic-guide.svg',
    srcActive: 'assets/images/icons/ic-guide-active.svg',
    subMenu: [],
  },
  {
    path: '/feedback-application',
    title: 'Feedback Application',
    src: 'assets/images/icons/ic-feedback.svg',
    srcActive: 'assets/images/icons/ic-feedback-active.svg',
    subMenu: [],
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() active = '';
  @Input() needApproval = 0;
  sidebarData = sidebarData;
}
