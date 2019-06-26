import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: './pages.component.html',
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
