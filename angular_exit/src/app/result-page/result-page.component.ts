import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { EventEmitter } from 'stream';
import { CommunityQuestion } from '../community-question';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})

export class ResultPageComponent implements OnInit {

  community: CommunityQuestion[];
  questions:CommunityQuestion[] = [];
  filterString:string

  constructor(private formBulder:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.getCommunityQuestions();
  }

  getCommunityQuestions(){
    this.api.getResult()
    .subscribe(data=>{
      this.community=data;
    })
  }

  viewDetails(id: number){
    this.router.navigate(['question-details', id])
  }

}
