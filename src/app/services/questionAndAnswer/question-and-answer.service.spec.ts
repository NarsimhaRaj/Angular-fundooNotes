import { TestBed, inject } from '@angular/core/testing';

import { QuestionAndAnswerService } from './question-and-answer.service';

describe('QuestionAndAnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionAndAnswerService]
    });
  });

  it('should be created', inject([QuestionAndAnswerService], (service: QuestionAndAnswerService) => {
    expect(service).toBeTruthy();
  }));
});
