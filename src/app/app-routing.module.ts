import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { PersonalPageComponent } from './components/personal-page/personal-page.component';
import { from } from 'rxjs';
import { PublicationsComponent } from './components/publications/publications.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'publications', component: PublicationsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'personal-page', component: PersonalPageComponent },
  //{ path: 'lots/:id', component: LotComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
