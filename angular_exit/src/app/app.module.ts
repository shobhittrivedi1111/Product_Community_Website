import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { QuestionSearchComponent } from './question-search/question-search.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { PostQuestionComponent } from './post-question/post-question.component';
import { NoPageComponent } from './no-page/no-page.component';
import { FormsModule } from '@angular/forms';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { FiltersPipe } from './Pipes/filters.pipe';
import { Filters2Pipe } from './Pipes/filters2.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/auth.guard';
import { NgToastModule } from 'ng-angular-popup';
import { MyQuestionComponent } from './my-question/my-question.component';
import { CommentReplyComponent } from './comment-reply/comment-reply.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    LoginComponent,
    QuestionSearchComponent,
    ResultPageComponent,
    PostQuestionComponent,
    NoPageComponent,
    QuestionDetailsComponent,
    FiltersPipe,
    Filters2Pipe,
    FooterComponent,
    RegistrationComponent,
    DashboardComponent,
    MyQuestionComponent,
    CommentReplyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
