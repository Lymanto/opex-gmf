import { Component, Input, OnInit } from '@angular/core';

type SidebarData = {
  path: string;
  title: string;
  src: string;
  srcActive: string;
  isSubMenuActive?: boolean;
  subMenu?: Array<SubMenu>;
  needApproval?: string;
};
type SubMenu = {
  path: string;
  title: string;
};

export const sidebarData: SidebarData[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    src: 'assets/images/icons/ic-dashboard.svg',
    srcActive: 'assets/images/icons/ic-dashboard-active.svg',
  },

  {
    path: '/need-approval',
    title: 'Need Approval',
    src: 'assets/images/icons/ic-approval.svg',
    srcActive: 'assets/images/icons/ic-approval-active.svg',
    needApproval: '0',
  },
  {
    path: '/reallocation-budget',
    title: 'Reallocation Budget',
    src: 'assets/images/icons/ic-reallocation.svg',
    srcActive: 'assets/images/icons/ic-reallocation-active.svg',
    isSubMenuActive: false,
    subMenu: [
      {
        path: '/general',
        title: 'General',
      },
      {
        path: '/realokasi-corporate',
        title: 'Realokasi Corporate',
      },
    ],
  },
  {
    path: '/report',
    title: 'Report',
    src: 'assets/images/icons/ic-report.svg',
    srcActive: 'assets/images/icons/ic-report-active.svg',
    isSubMenuActive: false,
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
  },
  {
    path: '/feedback-application',
    title: 'Feedback Application',
    src: 'assets/images/icons/ic-feedback.svg',
    srcActive: 'assets/images/icons/ic-feedback-active.svg',
  },
  {
    path: '/master-data',
    title: 'Master Data',
    src: 'assets/images/icons/ic-master.svg',
    srcActive: 'assets/images/icons/ic-master-active.svg',
    isSubMenuActive: false,

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
        path: '/kurs-usd',
        title: 'Kurs USD',
      },
    ],
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() active: string = '';
  @Input() needApproval: string = '0';

  sidebarData: SidebarData[] = sidebarData;
  constructor() { }
  ngOnInit() {
    sidebarData[2]['needApproval'] = this.needApproval;
  }
}
