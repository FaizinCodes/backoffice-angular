import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'add', component: AddEmployeeComponent },
  { path: 'list', component: ListEmployeeComponent },
];

@NgModule({
  imports: [CommonModule, AddEmployeeComponent, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeModule {}
