import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';

import { AppHeaderComponent } from './common/header/app.header.component';
import { AppFooterComponent } from './common/footer/app.footer.component';
import { AppMenuComponent } from './common/menu/app.menu.component';

import { Web3Service } from './services/web3.service';
import { RouterService } from './services/router.service';

import { DashBoardComponent } from './dashboard/dashboard.component';
import { ViewBlocksComponent } from './blocks/view-blocks.component';
import { BlockDetailsComponent } from './blocks/block-details.component';
import { PolicyService } from './services/policy.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppMenuComponent,
    DashBoardComponent,
    ViewBlocksComponent,
    BlockDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule,
    AppRouting
  ],
  providers: [Web3Service, PolicyService, RouterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
