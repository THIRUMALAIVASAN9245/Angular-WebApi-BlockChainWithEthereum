import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashBoardComponent } from './dashboard/dashboard.component';
import { ViewBlocksComponent } from './blocks/view-blocks.component';
import { BlockDetailsComponent } from './blocks/block-details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'view-blocks', component: ViewBlocksComponent },
  { path: 'block-detail/:id', component: BlockDetailsComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);