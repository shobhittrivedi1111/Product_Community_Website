import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunityQuestion } from '../community-question';
import { ApiService } from '../shared/api.service';
import { UserRegistration } from '../user-registration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  community: CommunityQuestion[]=[];
  users: UserRegistration[]=[];
  formGroup!:FormGroup
  subs:any = Subscription;
  filterQuestions: any = [];
  results:boolean=false
  findQuestions = new FormGroup({
    query: new FormControl('')
  })

  constructor(private api:ApiService, private router:Router, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.findQuestions=this.formbuilder.group({
      query:['', Validators.required]
    })

    this.results=false
    this.subs = this.api.current.subscribe((result)=>{
      this.filterQuestions=result;
      this.results=true
    });

// Get All Questions
    this.api.getResult()
    .subscribe(data=>{
      this.community=data;
    })

    // Get All Register User
    this.api.getUser()
    .subscribe(data=>{
      this.users=data;
    })
  }

  viewDetails(id: number){
    this.router.navigate(['question-details', id])
  }

  searchResult(){
    this.api.find(this.findQuestions.value);
  }
}