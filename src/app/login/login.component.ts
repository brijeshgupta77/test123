import { ChangeDetectionStrategy, Component, OnInit, Query } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {
  title = 'angular-learning';
  loginForm:FormGroup=null as any;
  employees: { id: number; name: string }[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' }
  ];

  constructor(private loginService: LoginService, private router: Router) { 

    console.log("LoginComponent constructor called");
  }

  ngOnInit() {
    console.log("LoginComponent ngOnInit called");
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
    console.log("LoginComponent ngOnInit completed");
  }

  trackByEmployeeId(_index: number, employee: { id: number; name: string }): number {
    return employee.id;
  }

  async onLogin() {
    console.log("onLogin called");
    var isLoggedIn =await this.loginService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);
    console.log("isLoggedIn: ", isLoggedIn);
    if(isLoggedIn){
      this.router.navigate(['/home']);
    }else{
      alert("Login failed");
    }
  }

}
