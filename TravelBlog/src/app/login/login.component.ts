import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  respondeData: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        uemail: ['', [Validators.required, Validators.email]],
        upassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      (err: string | number) => {
        console.log('Some Error Occured', +err);
      }
    );
  }

  onClickSignup() {
    this.router.navigate(['/signup']);
  }

  logIn() {
    if (this.loginForm.valid) {
      this.http
        .post<any>('http://localhost:3000/users/login', this.loginForm.value)
        .subscribe(
          (res) => {
            console.log(res);
            this.respondeData = res;
            console.log(this.respondeData.token);
            localStorage.setItem('token', this.respondeData.token);
            alert('Login Successfull!!!');
            this.loginForm.reset();
            this.router.navigate(['/home']);
          },
          (err) => {
            alert('Some error occured');
            console.log(err);
          }
        );
    } else {
      alert('Please enter valid login  credentials');
    }
  }
}
