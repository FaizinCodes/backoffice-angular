import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/employee',
    pathMatch: 'full',
  },
  {
    path: 'employee',
    loadChildren: () => import('./module/employee/employee.module').then((m) => m.EmployeeModule),
  },
];
