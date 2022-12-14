import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MountainsComponent } from './mountains/mountains.component';
import { SeaComponent } from './sea/sea.component';
import { ValleysComponent } from './valleys/valleys.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { DesertsComponent } from './deserts/deserts.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    DestinationsComponent,
    MountainsComponent,
    SeaComponent,
    ValleysComponent,
    LoginComponent,
    SignupComponent,
    DesertsComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
