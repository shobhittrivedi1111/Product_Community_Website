import { Component, OnInit } from '@angular/core';
import { CommunityQuestion } from '../community-question';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.css']
})

export class QuestionSearchComponent implements OnInit {

  formGroup!:FormGroup
  results:boolean=false;
  subs:any = Subscription;
  filterQuestions: any = [];

  findQuestions = new FormGroup({
    query: new FormControl('')
  })

  constructor(private api:ApiService, private router:Router, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    
    this.results=false
    this.subs = this.api.current.subscribe((result)=>{
      this.filterQuestions=result;
      this.results=true
    });

    this.findQuestions=this.formbuilder.group({
      query:['', Validators.required]
    })
  }

  // getCommunity(){
  //   this.api.getResult()
  //   .subscribe(data=>{
  //     this.community=data;
  //   })
  // }

  viewDetails(id: number){
    this.router.navigate(['question-details', id])
  }

  searchResult(){
    this.api.find(this.findQuestions.value);
  }

}
