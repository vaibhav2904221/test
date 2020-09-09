import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './log/login/login.component';
import {AddtoComponent} from './log/addto/addto.component';
import{TodoListComponent} from './log/todo-list/todo-list.component'


const routes: Routes = [
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'addto',
  component: AddtoComponent
},
  {
    path: 'todolist',
    component: TodoListComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
