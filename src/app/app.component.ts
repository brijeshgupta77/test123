import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'bri-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-learning';
  loginForm:FormGroup=null as any;

  constructor() { 

    console.log("AppComponent constructor called");
  }

  ngOnInit() {
    console.log("AppComponent ngOnInit called");
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
    console.log("AppComponent ngOnInit completed");
  }
  onLogin() {
    console.log("onLogin called");
  }

}
