import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'my-dashboard-icon',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Active Campaigns',
    icon: 'my-active-icon',
    link: '/campaigns/active',
    home: true,
  },
  {
    title: 'Completed Campaigns',
    icon: 'my-complete-icon',
    link: '/campaigns/completed',
    home: true,
  },
  {
    title: 'Outlet Details',
    icon: 'my-outlet-icon',
    link: '/outlet-details/1',
    // home: true,
  },
];
