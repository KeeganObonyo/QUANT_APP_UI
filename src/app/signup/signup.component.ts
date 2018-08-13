import { Component} from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { SignUpService } from '../signup.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  registered = false;
  public emailNotExists = false;
  public forgetPasswordEmailSent: boolean;
  public recoverEmail: string;
  output: any;

  user: any;
  constructor(public http: Http, public router: Router, public route: ActivatedRoute, public sign: SignUpService) { }

  new_user: User = new User();

  save() {
    console.log(this.new_user);

    this.sign.registerUser(this.new_user).subscribe(
      res => {
        console.log(res.text());
        this.registered = true;
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err.text());
      }
    );

  }

}

export class User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  }
