import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import{UsersService} from 'src/app/service/users.service';
import{ToastrService, ToastrModule} from 'ngx-toastr';
import {AddtoComponent} from '../addto/addto.component';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {AngularFireDatabase,AngularFireList  } from '@angular/fire/database';
import { ThrowStmt } from '@angular/compiler';
import {LoginComponent} from '../login/login.component'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
showData=[];
isloggedIn=false
@Output() isLogout =new EventEmitter<void> ()

constructor(public usersservice:UsersService,
            public toastr:ToastrService,
            public dialog:MatDialog
            ) { }

ngOnInit(): void {
    if(localStorage.getItem('user')!==null)
           this.isloggedIn = true
    else
            this.isloggedIn = false
            this.usersservice.getItem()
         .subscribe(list =>{
         this.showData = list.map(item =>{
      return{
        $key: item.key,
        ...item.payload.val()
      };
    });
  });
}

additems(){
    const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width= "60%";
    this.dialog.open(AddtoComponent,dialogconfig);
}

OnEdit(item:any){
  this.usersservice.populateForm(item);
  const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="60%";
  this.dialog.open(AddtoComponent,dialogconfig);
  
}
onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
      this.usersservice.deleteaddto($key);
      this.toastr.success("Item Deleted Successfully !")
   }
  }
logout(){
  this.usersservice.logout()
  this.isLogout.emit()
}
  
}
