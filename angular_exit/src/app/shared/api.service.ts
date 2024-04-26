import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommunityQuestion } from '../community-question';
import { UserRegistration } from '../user-registration'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUrl:string ="http://localhost:8182/questions";

  urlQsn:string ="http://localhost:8182/questions";

  urlSearch:string ="http://localhost:8182/search";

  urlAllUsers:string ="http://localhost:8182/allusers";

  urlQsnByEmail:string ="http://localhost:8182/filterbyemail";

  private msgSource = new Subject();  
  
  current = this.msgSource.asObservable();

  constructor(private http: HttpClient) { }

  // getCommunityList():Observable<CommunityQuestion[]>{
  //   return this.http.get<CommunityQuestion[]>(`${this.baseUrl}`);
  // }

  // getQuestions(){
  //   return this.http.get<CommunityQuestion[]>(this.urlQsn);
  // }

  getResult(){
    return this.http.get<any>(`${this.urlQsn}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postResult(data:any){
    return this.http.post<any>(`${this.urlQsn}`, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // postResult(community:CommunityQuestion):Observable<Object>{
  //   return this.http.post<any>(`${this.baseUrl}`, community);
  // }

  getQuestionById(id:number):Observable<CommunityQuestion>{
    return this.http.get<CommunityQuestion>(`${this.urlQsn}/${id}`)
  }

  find(data:{query:string}){
    return this.http.get(`${this.urlSearch}?query=${data.query}`)
    .subscribe((res) =>{ 
      this.msgSource.next(res); 
    })
  }

  findQsnByEmail2(data:{query:string}){
    return this.http.get(`${this.urlQsnByEmail}?query=${data.query}`)
    .subscribe((res) =>{ 
      this.msgSource.next(res); 
    })
  }

  findQsnByEmail(query:string):Observable<CommunityQuestion[]>{
    return this.http.get<CommunityQuestion[]>(`${this.urlQsnByEmail}?query=${query}`)
  }

  // postUsers(data:any){
  //   return this.http.post<any>("http://localhost:8182/users", data)
  //   .pipe(map((res:any)=>{
  //     return res;
  //   }))
  // }

  getUser(){
    return this.http.get<any>(`${this.urlAllUsers}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


}
