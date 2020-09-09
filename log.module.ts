import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AddtoComponent } from './addto/addto.component';
import {UsersService} from  '../service/users.service';
import { TodoListComponent } from './todo-list/todo-list.component';



@NgModule({
  declarations: [LoginComponent, AddtoComponent, TodoListComponent],
  imports: [
    CommonModule
  ]
  

})
export class LogModule { }
