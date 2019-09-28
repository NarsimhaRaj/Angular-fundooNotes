import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';


const routes: Route[]=[
  // {path:'',component:AppComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
  // {path:'**',redirectTo:"/login"}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }