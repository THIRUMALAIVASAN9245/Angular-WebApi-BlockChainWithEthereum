import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashBoardComponent } from './dashboard/dashboard.component';

import { ViewAccountsComponent } from './settings/view-accounts.component';
import { ViewBlocksComponent } from './blocks/view-blocks.component';
import { AddAccountComponent } from './settings/add-account.component';
import { sendTransactionComponent } from './transaction/send-transaction.component';
import { viewTransactionComponent } from './transaction/view-transaction.component';
import { BlockDetailsComponent } from './blocks/block-details.component';
import { TransactionDetailsComponent } from './transaction/transaction-details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'view-account', component: ViewAccountsComponent },
  { path: 'view-blocks', component: ViewBlocksComponent },
  { path: 'add-account', component: AddAccountComponent },
  { path: 'send-transaction', component: sendTransactionComponent },
  { path: 'view-transaction', component: viewTransactionComponent },
  { path: 'block-detail/:id', component: BlockDetailsComponent },
  { path: 'transaction-detail/:id', component: TransactionDetailsComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);