import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';

import { AppHeaderComponent } from './common/header/app.header.component';
import { AppFooterComponent } from './common/footer/app.footer.component';
import { AppMenuComponent } from './common/menu/app.menu.component';

import { DashBoardComponent } from './dashboard/dashboard.component';
import { Web3Service } from './services/web3.service';
import { ViewAccountsComponent } from './settings/view-accounts.component';
import { ViewBlocksComponent } from './blocks/view-blocks.component';
import { AddAccountComponent } from './settings/add-account.component';
import { sendTransactionComponent } from './transaction/send-transaction.component';
import { viewTransactionComponent } from './transaction/view-transaction.component';
import { BlockDetailsComponent } from './blocks/block-details.component';
import { TransactionDetailsComponent } from './transaction/transaction-details.component';
import { RouterService } from './services/router.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppMenuComponent,
    DashBoardComponent,
    ViewAccountsComponent,
    ViewBlocksComponent,
    AddAccountComponent,
    sendTransactionComponent,
    viewTransactionComponent,
    BlockDetailsComponent,
    TransactionDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting
  ],
  providers: [Web3Service, RouterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
