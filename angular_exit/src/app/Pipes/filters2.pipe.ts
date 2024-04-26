import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters2'
})
export class Filters2Pipe implements PipeTransform {

  transform(value: any, filterString:string, args?:any){
    if (value.length === 0 ){
      return value;
    }
    // if(!value)return null;
    // if(!args)return value;

    // args = args.toLowerCase();

    // return value.filter(function(data){
    //     return JSON.stringify(data).toLowerCase().includes(args);
    // });


    const questions = [];
    for(const question of value){
      if(question['subject'] === filterString || 
      question['product'].toLowerCase() === filterString.toLocaleLowerCase() || 
      question['message'] === filterString || 
      question['email'] === filterString){
        questions.push(question)
      }
    }
    return questions;


  }
}
