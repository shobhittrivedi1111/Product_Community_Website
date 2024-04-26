import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MyQuestionComponent } from './my-question/my-question.component';
import { NoPageComponent } from './no-page/no-page.component';
import { PostQuestionComponent } from './post-question/post-question.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { QuestionSearchComponent } from './question-search/question-search.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { AuthGuard } from './shared/auth.guard';  

const routes: Routes = [
  
  { path:'', component:DashboardComponent  },
  { path:'login', component:LoginComponent  },
  { path:'registration', component:RegistrationComponent  },
  
  {path:'homepage', component:HomepageComponent, canActivate : [AuthGuard]},
  {path:'question-search', component:QuestionSearchComponent, canActivate : [AuthGuard]},
  {path:'result-page', component:ResultPageComponent, canActivate : [AuthGuard]},
  {path:'post-question', component:PostQuestionComponent, canActivate : [AuthGuard]},
  {path:'question-details/:id', component:QuestionDetailsComponent, canActivate : [AuthGuard]},
  {path:'my-questions', component:MyQuestionComponent, canActivate : [AuthGuard]},
  
  {
    path:'**',
    component:NoPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
