import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase,AngularFireList  } from '@angular/fire/database';
import {Observable} from 'rxjs';
import {UsersService} from 'src/app/service/users.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-addto',
  templateUrl: './addto.component.html',
  styleUrls: ['./addto.component.css']
})
export class AddtoComponent implements OnInit {
  showData=[];
  submitted:boolean;
constructor(public usersservice:UsersService,
            public toastr:ToastrService) { }
ngOnInit(): void {
      this.usersservice.getItem().subscribe(
        list=>{
          this.showData= list.map(item=>{
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
        });
  }
formControls = this.usersservice.additemsform.controls;
 add(){
  this.submitted= true
  if(this.usersservice.additemsform.valid){
    if(this.usersservice.additemsform.get('$key').value == null){
       this.usersservice.sendItem(this.usersservice.additemsform.value)
       this.toastr.success("Item Added Succesfully!")
   } else{
       this.usersservice.updateItem(this.usersservice.additemsform.value);
       this.toastr.success("items updated successfully")
       }
       this.submitted=false
       this.usersservice.additemsform.reset()
       this.usersservice.additemsform.setValue({
        $key: null,
        title: '',
        icon: '',
        startdate: '',
        enddate: ''
        
      });
  }
       
}

}





