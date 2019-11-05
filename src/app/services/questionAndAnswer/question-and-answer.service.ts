import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionAndAnswerService {

  constructor(private httpService : HttpService) { }

  /**
   * @description http post request with token to ask a question for a notes or reply an answer 
   * @param noteId id of notes 
   * @param data message, likes, rate etc..
   */
  ask(data){
    let url=`/questionAndAnswerNotes/addQuestionAndAnswer`;
    return this.httpService.postWithToken(url,data);
  }

  /**
   * @description question likes
   * @param parentId note id
   * @param data like with boolean value;
   */
  like(parentId,data){
    let url=`/questionAndAnswerNotes/like/${parentId}`;
    return this.httpService.postWithToken(url,data);
  }

  /**
   * @description question rated
   * @param parentId note id
   * @param data like with boolean value;
   */
  rate(parentId,data){
    let url=`/questionAndAnswerNotes/rate/${parentId}`;
    return this.httpService.postWithToken(url,data);
  }
}