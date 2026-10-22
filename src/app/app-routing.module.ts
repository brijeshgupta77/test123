import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth-aurd.service';


const routes: Routes = [
  {'path': '', 'redirectTo': '/login', 'pathMatch': 'full'},
  {'path': 'login', 'component': LoginComponent, 'pathMatch': 'full'},
 {'path': 'home', 'component': HomeComponentComponent, 'pathMatch': 'full', canActivate: [authGuard]},
{'path': '**', 'redirectTo': '/login'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
