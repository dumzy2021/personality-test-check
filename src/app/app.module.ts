import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeadersComponent } from './headers/headers.component';
import { QuestionComponent } from './question/question.component';
import { ChangeBgDirective } from './directives/change-bg.directive';
import { FinishScreenComponent } from './finish-screen/finish-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeadersComponent,
    QuestionComponent,
    ChangeBgDirective,
    FinishScreenComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
