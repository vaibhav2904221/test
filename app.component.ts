import { Component } from '@angular/core';
import {FormControl,FormGroup,Validators } from '@angular/forms';
import{AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {UsersService} from  './service/users.service';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactive-form';
 alert:boolean=false
 issignedIn=false
 showdata=[];  
constructor(private usersservice:UsersService,
            private toastr:ToastrService){
             
}
SignupForm = new FormGroup({
          FirstName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]),
          LastName: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
          email:   new FormControl('',[Validators.required,Validators.email]),
          password:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]),
          mobile: new FormControl('', [Validators.required,Validators.maxLength(10)]),
          address:new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]*')])
  })

  get FirstName(){return this.SignupForm.get('FirstName')}
  get LastName(){return this.SignupForm.get('LastName')}
  get email() {return this.SignupForm.get('email')}
  get password(){return this.SignupForm.get('password')}
  get mobile(){return this.SignupForm.get('mobile')}
  get address(){return this.SignupForm.get('address')}


onsignup(){
            if(this.SignupForm.valid){ 
              const {email,password}= this.SignupForm.value
            this.usersservice.SignUp(email, password)
            this.usersservice.senddata(this.SignupForm.value)
            this.alert=true
            this.toastr.success('form submitted successfully')
            this.SignupForm.reset()
            }    
  }



}