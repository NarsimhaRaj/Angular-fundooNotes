import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesComponent } from './components/notes/notes.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './components/cart/cart.component';

const routes: Route[] = [
  { path: '', redirectTo: "/cart", pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: NotesComponent },
      { path: "archive", component: ArchiveComponent },
      { path: "trashNotes", component: TrashComponent }
    ]
  },
  { path: 'notes', component: NotesComponent },
  { path: '**', redirectTo: "/cart" }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }