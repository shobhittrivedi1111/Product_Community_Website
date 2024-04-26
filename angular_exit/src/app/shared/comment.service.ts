import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { UserComment } from '../user-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url:string ="http://localhost:8182/comment";
  url2:string="http://localhost:8182/filtercomment"

  private msgSource = new Subject();  
  
  current = this.msgSource.asObservable();

  constructor(private http: HttpClient) { }


  getComment(){
    return this.http.get<any>(`${this.url}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postComment(data:any){
    return this.http.post<any>(`${this.url}`, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateComment(data:any){
    let id=data.id
    let msg=data.message
    return this.http.put<any>("http://localhost:8182/editcomment/"+id+"/"+msg, null)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateComment2(data:any, id:number){
    return this.http.put<any>("http://localhost:8182/updatecomment/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteComment(id:any){
    return this.http.delete<any>("http://localhost:8182/deletecomment/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getCommentByParentId(id:number):Observable<UserComment>{
    return this.http.get<UserComment>(`${this.url}/${id}`)
  }

  getCommentsById(id:number):Observable<UserComment>{
    return this.http.get<UserComment>(`${this.url}/${id}`)
  }

  getCommentByPid2(pid:number):Observable<UserComment[]>{
    return this.http.get<UserComment[]>(`${this.url2}?pid=${pid}`)
  }
  
// FIND()
  getCommentByPid(pid:number){
    return this.http.get(`${this.url2}?pid=${pid}`)
    .subscribe((res) =>{ 
      this.msgSource.next(res); 
    })
  }

}
