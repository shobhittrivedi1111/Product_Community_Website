import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  // transform(value: any, filterString:string){
  //   if (value.length === 0 || filterString === ''){
  //     return value;
  //   }


  //   const questions = [];
  //   for(const question of value){
  //     if(question['subject'] === filterString || question['message'] === filterString || question['email'] === filterString){
  //       questions.push(question)
  //     }
  //   }
  //   return questions;
  // }

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    return value.filter(function(data){
        return JSON.stringify(data).toLowerCase().includes(args);
    });
}

}
