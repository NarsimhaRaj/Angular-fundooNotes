import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http:HttpService) { }

  /**
   * @description gets all the labels in the Notes
   */
  getNoteLabelList(){
    let url="/noteLabels/getNoteLabelList"
    return this.http.getWithToken(url);
  }
  /**
   * @description to add label to notes 
   * @param data contains note id to wich labelId 
   */
  addLabel(data){
    let url="/noteLabels";
    return this.http.post(url,data);
  }

  /**
   * @description deletes a label with label id set as parameter to delete rest serivce
   * @param data , data contains label id
   */
  deleteLabel(labelId){
    let url=`/noteLabels/${labelId}/deleteNoteLabel`;
    return this.http.delete(url,labelId);
  }

}
