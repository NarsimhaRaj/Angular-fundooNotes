import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { FormControl } from '@angular/forms';
import { QuestionAndAnswerService } from 'src/app/services/questionAndAnswer/question-and-answer.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  noteId: string;
  notes: any = {
    title: "",
    description: "",
    noteCheckLists: [],
    questionAndAnswerNotes: [{
      createdDate: "",
      like: [{
        userId: "",
        like: false
      }],
      rate: [],
      user: {
        firstName: "", lastName: "", imageUrl: ""
      }
    }],
  };
  reply: boolean = false;
  likes = [];
  isLiked: boolean = true;
  ratings = [];

  stars: number[] = [1, 2, 3, 4, 5];

  editContent = new FormControl();

  noteCheckLists: any;
  constructor(private activeRoute: ActivatedRoute, private noteService: NoteService, private route: Router,
    private qAnsService: QuestionAndAnswerService) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params) => {
      this.noteId = params.get("noteId");
      this.getNotes(this.noteId);
    })
  }

  getNotes(noteId) {
    // gets details of notes with  noteId
    this.noteService.getNoteWithId(noteId).subscribe((response: any) => {
      this.notes = response.data.data[0];
      this.getLikesAndRate();
    });
  }
  getLikesAndRate() {

    let question: any;
    let index = 0;

    this.likes.length=this.notes.questionAndAnswerNotes.length;
    this.ratings.length=this.notes.questionAndAnswerNotes.length;

    this.likes.fill(0);
    this.ratings.fill(0);
    
    for (question of this.notes.questionAndAnswerNotes) {
      for (let like of question.like) {
        if (like.like){
          ++this.likes[index];
        }
      }
      for (let rate of question.rate) {
          this.ratings[index]=rate.rate;
      }
      index++;
    }
  }

  closeQuestionAnswers() {
    this.route.navigateByUrl("dashboard");
  }

  getImageUrl(imageUrl) {
    return `url(http://fundoonotes.incubation.bridgelabz.com/${imageUrl})`;
  }

  /**
   * @description adds question to notes
   */
  askQuestion() {
    let data = { notesId: this.noteId, message: this.editContent.value };
    this.qAnsService.ask(data).subscribe((response) => {
      this.getNotes(this.noteId);
    });
  }

  /**
   * @description to show how many liked question
   * @param questionId question id
   * @param like like is boolean value if hit like true, if dislike = false
   */
  like(questionId,like) {
    this.isLiked=!this.isLiked;
    let data = {
      like: like
    }
    console.log(data,questionId);
    this.qAnsService.like(questionId, data).subscribe((response) => {
      console.log(response);
      this.getNotes(this.noteId);
    })
  }

  rate(questionId,num) {

    let data = { 
      rate: num.toString()
    }
    console.log(data);
    this.qAnsService.rate(questionId, data).subscribe((response) => {
      console.log(response);
      this.getNotes(this.noteId);
    })
  }
}
