import { Routes, RouterModule } from '@angular/router';
import { OrderManagerComponent } from './order-manager/components/order-manager/order-manager.component';

const routes: Routes = [
  {
    path: 'order-manager',
    component: OrderManagerComponent
  },
  {
    path: '',
    redirectTo: '/order-manager', pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/order-manager', pathMatch: 'full'
  }
];

export const AppRoutes = RouterModule.forRoot(routes);
