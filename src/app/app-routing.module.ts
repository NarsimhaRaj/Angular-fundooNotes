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
import { AuthGuard, RegisterGuard } from './auth/auth.guard';
import { CardComponent } from './components/card/card.component';
import { LabelnotesComponent } from './components/labelnotes/labelnotes.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ReminderNotesComponent } from './components/reminder-notes/reminder-notes.component';
import { QuestionAnswerComponent } from './components/question-answer/question-answer.component';

const routes: Route[] = [
  { path: '', redirectTo: "/card", pathMatch: 'full' },
  { path: 'card', component: CardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [RegisterGuard] },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: NotesComponent },
      { path: "archive", component: ArchiveComponent },
      { path: "trashNotes", component: TrashComponent },
      { path: "labelNotes/:labelName", component: LabelnotesComponent },
      { path: "cart", component: ShoppingCartComponent},
      { path: "reminderNotes", component: ReminderNotesComponent },
      { path: "QuestionAnswer/:noteId", component: QuestionAnswerComponent }
    ]
  },
  { path: 'notes', component: NotesComponent },
  { path: '**', redirectTo: "/card" }
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