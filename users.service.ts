import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AppComponent } from '../app.component';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr'
import {AddtoComponent} from '../log/addto/addto.component';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: Observable<firebase.User>;
  todo: AngularFireList<any>
  items: AngularFireList<any>
  data = [];
  Loggedin: boolean

  documentToDomainObject = _ => {
    const object = _.payload;
    object.id = _.payload;
    return object;
  }
  constructor(public db: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public router: Router,
              public toastr: ToastrService) { }

  async SignUp(email, password) {
    await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.Loggedin = true
        localStorage.setItem('user', JSON.stringify(res.user))
        this.router.navigate(['todolist']);
    })
      .catch(err => {
        this.toastr.error(err.message)
        this.router.navigate(['signup'])
      })
  }

 async login(email, password) {
    await this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.Loggedin = true
        localStorage.setItem('user', JSON.stringify(res.user))
        this.router.navigate(['todolist']);
        this.toastr.success("Login Successfully");
      })
      .catch(err => {
        this.toastr.error("Something Went wrong:",err.message)
        this.router.navigate(['login'])
      });
  }
  logout(){
     this.afAuth.signOut()
     localStorage.removeItem('user')
     this.router.navigate(['login'])
     this.toastr.success("signout Successfully")
   } 

  additemsform= new FormGroup({
    $key: new FormControl(null),
    title:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]),
    icon: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]),
    startdate: new FormControl('',Validators.required),
    enddate:new FormControl('',Validators.required),
  });

sendItem(data: any) {
      this.db.list('todo').push({
      title: data.title,
      icon: data.icon,
      startdate: data.startdate,
      enddate: data.enddate
    })
  }

getItem() {
    this.todo = this.db.list('todo')
    return this.todo.snapshotChanges();
  }

senddata(data: any) {
    this.db.list('items').push(data)
  }

getData() {
    return this.db.list('items').snapshotChanges()
      .pipe(map(action => action
        .map(a => {
          const key = a.payload.key;
          const data = a.payload.val();
          return data;
        })));
  }

populateForm(data){
         this.additemsform.setValue(data)
  }

updateItem(data: any) {
      this.db.list('todo').update(data.$key, {
      title: data.title,
      icon: data.icon,
      startdate: data.startdate,
      enddate: data.enddate
    })
  }

deleteaddto($key) {
    this.db.list('todo').remove($key);
  }

  

}