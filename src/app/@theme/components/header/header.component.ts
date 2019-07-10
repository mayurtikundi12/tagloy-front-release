import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any={
    name: localStorage.getItem('name'),
    picture: '../../../../assets/images/neelk.png'
  };

  userMenu = [{ title: 'Log out' }];


  onMenuItemClick() { console.log("menu") }

  constructor(
    private _router:Router ,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    // private userService: UserData,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService) {
      // For event click on Log out
      this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });
      }

  onContecxtItemSelection(title) {
    console.log('click', title);
    if(title == 'Log out'){
      localStorage.clear() ; 
      sessionStorage.clear();
      this._router.navigate(['/login'])
    }
  }

  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

}
