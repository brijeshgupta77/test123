import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  get isLoggedIn(): boolean {
    return window.localStorage.getItem('isLoggedIn') === 'true';
  }

  constructor(private httpClient:HttpClient) { }
 async login(username:string,password:string):Promise<boolean>{
    console.log("LoginService liogin called");

   await this.httpClient.post('https://localhost:44305/api/Auth', {username: username, password: password}).subscribe(
      () => {
        window.localStorage.setItem('isLoggedIn', 'true');
        return true;
      },
      (error) => {
        console.error('Login failed:', error);
        window.localStorage.setItem('isLoggedIn', 'false');
        return false;
      }
    );
    // if(username==="admin" && password==="admin"){
    //   window.localStorage.setItem('isLoggedIn', 'true');
    //   return true;
    // }
    window.localStorage.setItem('isLoggedIn', 'false');
    return false;
  }
}
