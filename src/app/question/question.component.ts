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
  anIntrovert: number = 0;
  anExtrovert: number = 0;
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
      },
    });
  }
  nextQuestion() {
    if (this.currentQuestion >= this.questionList.length - 1) {
      this.currentQuestion = this.questionList.length - 1;
      this.isTestCompleted = true;
    }
    this.currentQuestion++;
    this.resetCounter();
  }
  selectedAnswer(option: any) {
    this.attemptedQuestions++;
    if (option.status === 'i') {
      this.anIntrovert++;
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    } else {
      setTimeout(() => {
        this.anExtrovert++;
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
    this.anIntrovert = 0;
    this.anExtrovert = 0;
    this.currentQuestion = 0;
    this.attemptedQuestions = 0;
    this.resetCounter();
    this.getAllQuestions();
  }
  checkTestStatus(): string {
    if (this.anExtrovert == this.anIntrovert) {
      return 'Undecided';
    } else if (this.anExtrovert > this.anIntrovert) {
      return 'an Extrovert';
    }
    return 'an Introvert';
  }
}
