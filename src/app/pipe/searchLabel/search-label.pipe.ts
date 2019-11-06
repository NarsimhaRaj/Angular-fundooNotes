import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchLabel'
})
export class SearchLabelPipe implements PipeTransform {

  transform(labels: any, searchWord?: any): any {
    if(!labels || !searchWord)
      return labels;
    
    return labels.filter((label)=>{
      return ((label.label.toLowerCase().indexOf(searchWord.toLowerCase()) !==-1));
    })
  }

}
