import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure:false
})
export class SearchPipe implements PipeTransform {

  transform(notes: any, searchWord: string): any {
    if(!notes || !searchWord)
      return notes;
    
    return notes.filter((note)=>{
      return ((note.title.toLowerCase().indexOf(searchWord.toLowerCase()) !==-1) || (note.description.toLowerCase().indexOf(searchWord.toLowerCase())!==-1));
    })
  }


}
