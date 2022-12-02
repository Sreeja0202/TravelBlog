import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationsComponent } from './destinations/destinations.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MountainsComponent } from './mountains/mountains.component';
import { SeaComponent } from './sea/sea.component';
import { SignupComponent } from './signup/signup.component';
import { ValleysComponent } from './valleys/valleys.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'destinations',
    component: DestinationsComponent,
  },
  {
    path: 'moutains',
    component: MountainsComponent,
  },
  {
    path: 'sea',
    component: SeaComponent,
  },
  {
    path: 'valleys',
    component: ValleysComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
