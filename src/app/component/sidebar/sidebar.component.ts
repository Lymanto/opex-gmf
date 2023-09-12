import { Component } from '@angular/core';

export const sidebarData = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    src: 'assets/images/icons/ic-dashboard.svg',
    srcIn: 'assets/images/icons/ic-dashboard-active.svg',
    srcOut: 'assets/images/icons/ic-dashboard.svg',
    isHover: false,
    isActive: true,
  },
  {
    path: '/request',
    title: 'Request',
    src: 'assets/images/icons/ic-request.svg',
    srcIn: 'assets/images/icons/ic-request-active.svg',
    srcOut: 'assets/images/icons/ic-request.svg',
    isHover: false,
    isActive: true,
  },
  {
    path: '/need-approval',
    title: 'Need Approval',
    src: 'assets/images/icons/ic-approval.svg',
    srcIn: 'assets/images/icons/ic-approval-active.svg',
    srcOut: 'assets/images/icons/ic-approval.svg',
    isHover: false,
    isActive: true,
  },
  {
    path: '/reallocation-budget',
    title: 'Reallocation Budget',
    src: 'assets/images/icons/ic-reallocation.svg',
    srcIn: 'assets/images/icons/ic-reallocation-active.svg',
    srcOut: 'assets/images/icons/ic-reallocation.svg',
    isHover: false,
    isActive: true,
  },
  {
    path: '/report',
    title: 'Report',
    src: 'assets/images/icons/ic-report.svg',
    srcIn: 'assets/images/icons/ic-report-active.svg',
    srcOut: 'assets/images/icons/ic-report.svg',
    isHover: false,
    isActive: true,
  },
  {
    path: '/guidance-application',
    title: 'Guidance Application',
    src: 'assets/images/icons/ic-guide.svg',
    srcIn: 'assets/images/icons/ic-guide-active.svg',
    srcOut: 'assets/images/icons/ic-guide.svg',
    isHover: false,
    isActive: true,
  },
  {
    path: '/feedback-application',
    title: 'Feedback Application',
    src: 'assets/images/icons/ic-feedback.svg',
    srcIn: 'assets/images/icons/ic-feedback-active.svg',
    srcOut: 'assets/images/icons/ic-feedback.svg',
    isHover: false,
    isActive: true,
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  sidebarData = sidebarData;
}
