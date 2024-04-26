import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { CommunityQuestion } from '../community-question';
import { ApiService } from '../shared/api.service';
import { CommentService } from '../shared/comment.service';
import { UserComment } from '../user-comment';


@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {

  id:number
  community: CommunityQuestion=new CommunityQuestion()
  userCommentObj:UserComment=new UserComment();
  comments:UserComment[]=[];

  filterComments: any = [];

  showAdd !: boolean
  showUpdate !: boolean

  commentForm:FormGroup;
  sessionEmail:string;
  userEmail:string

  constructor(private toast:NgToastService, private commentApi:CommentService ,private api:ApiService, private router:ActivatedRoute, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.sessionEmail=sessionStorage.getItem('email')

    this.userEmail=this.sessionEmail;

    this.id=this.router.snapshot.params['id']
// Fetching questions by id----
    this.getQuestionsById();
    this.getCommentPid();

// Insert Comment into database
    this.commentForm=this.formBuilder.group({
      parentid:[this.id],
      email:[this.sessionEmail],
      message:['', Validators.required],
    })
  }

  getAllComment(){
    this.commentApi.getComment()
    .subscribe(data=>{
      this.comments=data;
    })
  }

  getQuestionsById(){
    this.id=this.router.snapshot.params['id']
    this.api.getQuestionById(this.id)
    .subscribe(data=>{
      this.community=data;
    },err=>console.log(err));
  }

  getCommentPid(){
    this.id=this.router.snapshot.params['id']
    this.commentApi.getCommentByPid2(this.id)
    .subscribe(data=>{
      console.log(data);
      this.filterComments=data;
    },err=>console.log(err));
  }

  onSubmitCommentForm(){
    
    this.userCommentObj.parentid=this.commentForm.value.parentid;
    this.userCommentObj.email=this.commentForm.value.email;
    this.userCommentObj.message=this.commentForm.value.message;

    // console.log(this.userCommentObj);
    this.commentApi.postComment(this.userCommentObj)
    .subscribe(data=>{
      this.toast.success({detail:"Success", summary:"Comment added successfully", duration:3000 })
      Swal.fire('Thank you...', 'Your comment submitted succesfully!', 'success')
      let ref=document.getElementById('cancel')
      ref?.click();
      this.commentForm.reset(); 
      this.getCommentPid();
      // this.router.navigate(['/result-page']);
    },
      err=>{
        this.toast.error({detail:"Error Occoured", summary:"Something went wrong", duration:3000})
      })
  }


// ----------------comment works------------------

deleteCommentResult(com:any){
  console.log("deleteCommentResult clicked....");
  this.commentApi.deleteComment(com.id)
  .subscribe(res=>{
    this.toast.warning({detail:"Success", summary:"Comment deleted successfully", duration:3000 })
    this.getCommentPid()
  },err=>{
    this.toast.error({detail:"Error Occoured", summary:"Something went wrong", duration:3000})
  })
}

onEdit(com:any){
  this.showAdd=false;
  this.showUpdate=true;

  this.userCommentObj.id=com.id
  // this.commentForm.controls['parentid'].setValue(com.parentid);
  // this.commentForm.controls['email'].setValue(com.email);
  this.commentForm.controls['message'].setValue(com.message);
}

updateCommentResult(){
  this.userCommentObj.parentid=this.commentForm.value.parentid;
  this.userCommentObj.email=this.commentForm.value.email;
  this.userCommentObj.message=this.commentForm.value.message;

  this.commentApi.updateComment(this.userCommentObj)
  .subscribe(res=>{
    this.toast.success({detail:"Success", summary:"Comment updated successfully", duration:3000 })
    let ref=document.getElementById('cancel')
    ref?.click();
    this.commentForm.reset();
    this.getCommentPid();
  },err=>{
    this.toast.error({detail:"Error Occoured", summary:"Something went wrong", duration:3000 })
  })
}

clickAddComment(){
  // this.commentForm.reset();
  this.showAdd=true;
  this.showUpdate=false;
}

confirmBox(com:any){
  Swal.fire({
    title: 'Are you sure want to remove?',
    text: 'You will not be able to recover this comment!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.commentApi.deleteComment(com.id)
      .subscribe(res=>{
        Swal.fire('Deleted!', 'Your imaginary file has been deleted.','success')
        this.toast.warning({detail:"Success", summary:"Comment deleted successfully", duration:3000 })
        this.getCommentPid()
      },err=>{
        this.toast.error({detail:"Error Occoured", summary:"Something went wrong", duration:3000})
      })
      
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your comment is safe :)',
        'error'
      )
    }
  })
}

}
