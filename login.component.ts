import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {UsersService} from  'src/app/service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

LoggedIn: boolean
  constructor(public usersservice:UsersService) { }

  ngOnInit(): void {
        
    if(localStorage.getItem('user')!==null)
    this.LoggedIn=true
    else
    this.LoggedIn=false

  }
loginform=new FormGroup({
       email:new FormControl('',Validators.required),
       password: new FormControl('',Validators.required),
  });

get email(){
  return this.loginform.get('email');
}
get password(){
     return this.loginform.get('password');
}
 async login(){

          if(this.loginform.valid){
      const {email,password}= this.loginform.value
      this.usersservice.login(email, password)
      this.loginform.reset();
  }
}
  

}
