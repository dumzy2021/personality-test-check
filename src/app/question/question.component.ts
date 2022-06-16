import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  isTestCompleted: boolean = false;
  done: boolean = false;
  questionList: any = [];
  currentQuestion: number = 0;
  counter: number = 60;
  correctAnswers: number = 0;
  attemptedQuestions: number = 0;
  interval$!: Subscription;
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe({
      next: (value) => {
        this.questionList = value.questions;
        console.log(value.questions);
      },
    });
  }
  nextQuestion() {
    this.currentQuestion++;
    this.resetCounter();
    if (this.currentQuestion >= this.questionList.length - 1) {
      this.currentQuestion = this.questionList.length - 1;
      this.isTestCompleted = true;
    }
  }
  selectedAnswer(option: any) {
    this.attemptedQuestions++;
    if (option.correct) {
      this.correctAnswers++;
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    } else {
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe({
      next: (value) => {
        this.counter--;
        if (this.counter === 0) {
          this.nextQuestion();
          this.counter = 60;
        }
      },
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    if (this.isTestCompleted) {
      this.stopCounter();
      return;
    }
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetTest() {
    this.isTestCompleted = false;
    this.counter = 60;
    this.correctAnswers = 0;
    this.currentQuestion = 0;
    this.attemptedQuestions = 0;
    this.resetCounter();
    this.getAllQuestions();
  }
}
