import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { PersonalPageComponent } from './components/personal-page/personal-page.component';
import { EnteredComponent } from './components/entered/entered.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { FormsModule } from '@angular/forms';
import { RequestsComponent } from './components/requests/requests.component';
import { FriendsComponent } from './components/friends/friends.component';
import { FriendPageComponent } from './components/friend-page/friend-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    PersonalPageComponent,
    EnteredComponent,
    PublicationsComponent,
    RequestsComponent,
    FriendsComponent,
    FriendPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
