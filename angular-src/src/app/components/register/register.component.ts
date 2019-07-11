import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  username: String;
  password: String;

  constructor(private validateService: ValidateService, 
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    //console.log(123);
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    //Required Fields
    if(!this.validateService.validateRegister(user)) {
      console.log('zapolni vse');
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      console.log('email ne validen');
      return false;
    }

    //Register user
    this.authService.registerUser(user).subscribe(data => {
        console.log(data);
        if(data.success) {
          console.log("vse ok!");
          this.router.navigate(['/login']);
        } else {
          console.log("takoi uje est");
          this.router.navigate(['/register']);
        }
    });
  }


}
