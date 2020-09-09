import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule}  from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule, FormControlDirective} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from  '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {UsersService}  from  './service/users.service';
import {LoginComponent} from './log/login/login.component'
import {AddtoComponent} from './log/addto/addto.component';
import {FileDownloaderClientComponent } from './File/file-downloader-client/file-downloader-client.component';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ToastrModule} from  'ngx-toastr';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {MatDialogModule} from '@angular/material/dialog';
import{TodoListComponent} from './log/todo-list/todo-list.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddtoComponent,
    FileDownloaderClientComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    MatDialogModule,
],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule { }
