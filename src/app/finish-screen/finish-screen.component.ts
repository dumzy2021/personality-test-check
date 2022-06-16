import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-finish-screen',
  templateUrl: './finish-screen.component.html',
  styleUrls: ['./finish-screen.component.scss'],
})
export class FinishScreenComponent implements OnInit {
  @Input() item: string = '';
  @Input() attemptedQuestions: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() introvertCount: number = 0;
  @Input() extrovertCount: number = 0;
  @Output() onResetTest = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
  checkTestStatus(): string {
    if (this.extrovertCount == this.introvertCount) {
      return 'Undecided';
    } else if (this.extrovertCount > this.introvertCount) {
      return 'an Extrovert';
    }
    return 'an Introvert';
  }
  resetTest() {
    this.onResetTest.emit();
  }
}
