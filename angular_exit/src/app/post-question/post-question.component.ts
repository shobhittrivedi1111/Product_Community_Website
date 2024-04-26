import { Component, OnInit } from '@angular/core';
import { CommunityQuestion } from '../community-question';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})

export class PostQuestionComponent implements OnInit {

  CommunityQuestionObj: CommunityQuestion=new CommunityQuestion();
  public postQuestions!: FormGroup;

  userEmail:string;  
  currentDate = new Date().toISOString();
  
  constructor(private toast:NgToastService, private api:ApiService, private router:Router, private formBuilder:FormBuilder) { }  

  ngOnInit(): void {
    this.userEmail=sessionStorage.getItem('email')
    this.postQuestions=this.formBuilder.group({
      subject:['', Validators.required],
      email:[this.userEmail],
      product:['', Validators.required],
      message:['', Validators.required],
    })
  }

  onSubmit(){
    this.CommunityQuestionObj.subject=this.postQuestions.value.subject;
    this.CommunityQuestionObj.email=this.postQuestions.value.email;
    this.CommunityQuestionObj.product=this.postQuestions.value.product;
    this.CommunityQuestionObj.message=this.postQuestions.value.message;

    // console.log(this.CommunityQuestionObj);
    this.api.postResult(this.CommunityQuestionObj)
    .subscribe(data=>{
      console.log(data);
      this.toast.success({detail:"Sucess", summary:"Your Query Added Successfully", duration:5000}) 
      Swal.fire('Thank you...', 'Your Question submitted succesfully!', 'success')
      let ref=document.getElementById('cancel')
      ref?.click();
      this.postQuestions.reset(); 
      this.router.navigate(['/result-page']);
    },
      err=>{
        this.toast.error({detail:"Error Occoured", summary:"Something went wrong", duration:5000}) 
      });
  }
}
