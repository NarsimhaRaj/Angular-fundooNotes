import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/noteServices/note.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  noteId:string;
  notes:any={
    title:"",
    description:"",
    noteCheckLists:[]
  };

  noteCheckLists:any;
  constructor( private activeRoute:ActivatedRoute, private noteService:NoteService, private route:Router) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params)=>{
      this.noteId=params.get("noteId");

      // gets details of notes with  noteId
      this.noteService.getNoteWithId(this.noteId).subscribe((response:any)=>{
        this.notes=response.data.data[0];
        console.log(response);
      });
    })
  }

  closeQuestionAnswers(){
    this.route.navigateByUrl("dashboard");
  }

}
