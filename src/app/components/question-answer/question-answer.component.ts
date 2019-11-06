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
      userId:"",
      rate: [],
      user: {
        firstName: "", lastName: "", imageUrl: ""
      }
    }],
  };
  reply: boolean = false;
  likes = [];
  ratings = [];
  isLiked=[];

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
    let length=this.notes.questionAndAnswerNotes.length;
    this.likes.length=length;
    this.ratings.length=length;
    this.isLiked.length=length;

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
  like(question,like,index) {
    this.isLiked[index]=!this.isLiked[index];
    let data = {
      like: like
    }
    this.qAnsService.like(question.id, data).subscribe((response) => {
      this.getNotes(this.noteId);
      // this.isLiked(question.like,question.id);
    })
  }

  /**
   * @description rating added to question 
   * @param questionId question id to which rating is updated
   * @param num rating number 1 to 5
   */
  rate(questionId,num) {

    let data = { 
      rate: num.toString()
    }
    this.qAnsService.rate(questionId, data).subscribe((response) => {
      this.getNotes(this.noteId);
    })
  }

  /**
   * @description calculates avg rating of a question returns value
   * @param rate an array of rating received by users to a question
   */
  getAvgRating(rate){
    let sum=0;
    
    if(rate.length==0)
      return 0;
    
    for(let r of rate){
      sum+=r.rate;
    }
    return sum/rate.length;
  }
}
