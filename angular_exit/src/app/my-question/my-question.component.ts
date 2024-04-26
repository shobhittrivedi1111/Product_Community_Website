import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-my-question',
  templateUrl: './my-question.component.html',
  styleUrls: ['./my-question.component.css']
})
export class MyQuestionComponent implements OnInit {

  id:number
  sessionEmail:string;
  filterQsnByEmail: any = [];
  constructor(private api:ApiService, private router:ActivatedRoute, private router2:Router) { }

  ngOnInit(): void {
    this.sessionEmail=sessionStorage.getItem('email')
    this.getQsnByEmail();
  }

  getQsnByEmail(){
    this.id=this.router.snapshot.params['id']
    this.sessionEmail=sessionStorage.getItem('email')
    this.api.findQsnByEmail(this.sessionEmail)
    .subscribe(data=>{
      console.log(data);
      this.filterQsnByEmail=data;
    },err=>console.log(err));
  }

  viewDetails(id: number){
    this.router2.navigate(['question-details', id])
  }


}
