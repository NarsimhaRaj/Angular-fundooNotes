import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-labelnotes',
  templateUrl: './labelnotes.component.html',
  styleUrls: ['./labelnotes.component.scss']
})
export class LabelnotesComponent implements OnInit {

  labelNotesList:any;
  labelName:string;

  // default data before changes applied from dashboard component
  data = {
    viewLayoutType: "row wrap",
    viewStyling: true
  }

  constructor(private noteServices:NoteService, private activeRoute:ActivatedRoute, private dashBoard:DashboardComponent) {

    this.data = this.dashBoard.getData();

    this.dashBoard.emitView.subscribe(()=>{
      this.data = this.dashBoard.getData();
    });

   }

  ngOnInit() {

    this.activeRoute.paramMap.subscribe((params)=>{
      this.labelName=params.get("labelName");
      this.getNoteListByLabel(this.labelName);
    })
  }

  /**
   * @description passes a labelName to getlabelNotesList in noteService which sends an api request to http services
   * @param labelName label name 
   */
  getNoteListByLabel(labelName){
    this.noteServices.getLabelNotesList(labelName).subscribe((response:any)=>{
      this.labelNotesList=response.data.data;
      console.log(this.labelNotesList)
    });
  }
}
