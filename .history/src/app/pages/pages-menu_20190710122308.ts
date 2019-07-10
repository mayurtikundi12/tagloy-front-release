import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-e-commerce',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Active Campaigns',
    url: '<img src="../../assets/icons/ActiveCampaign.png">',
    link: '/campaigns/active',
    home: true,
  },
  {
    title: 'Completed Campaigns',
    icon: 'nb-e-commerce',
    link: '/campaigns/completed',
    home: true,
  },
  {
    title: 'Outlet Details',
    icon: 'nb-e-commerce',
    link: '/outlet-details/1',
    // home: true,
  },
];
