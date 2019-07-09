/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import {MatTableModule,MatSortModule,MatPaginatorModule} from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PeriodsService } from './@core/mock/periods.service';

import { ApiData } from './commons/data/apis.data';
import { ApisService } from './commons/apis.service';
import { AuthGuardService } from './commons/auth-guard.service';
import { InterceptorService } from './commons/interceptor.service';
import { UtilService } from './util/utility.service';
import { DataBootstrapService } from './pages/shared/services/data-bootstrap.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    // MatTableModule,MatSortModule,MatPaginatorModule
    ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    PeriodsService,ApiData,ApisService,AuthGuardService,UtilService,
    DataBootstrapService
  ],
})
export class AppModule {
}
