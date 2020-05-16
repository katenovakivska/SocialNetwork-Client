import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { PersonalPageComponent } from './components/personal-page/personal-page.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { RequestsComponent } from './components/requests/requests.component';
import { FriendsComponent } from './components/friends/friends.component';
import { FriendPageComponent } from './components/friend-page/friend-page.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'publications', component: PublicationsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'personal-page', component: PersonalPageComponent },
  { path: 'requests', component: RequestsComponent},
  { path: 'friends', component: FriendsComponent},
  { path: 'friend-page/:userName', component: FriendPageComponent},
  { path: 'friend-page', component: FriendPageComponent}
  //{ path: 'lots/:id', component: LotComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
