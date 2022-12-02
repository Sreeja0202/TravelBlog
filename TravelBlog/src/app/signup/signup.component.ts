import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        ufname: ['', [Validators.required]],
        ulname: ['', [Validators.required]],
        umobile: ['', [Validators.required]],
        uemail: ['', [Validators.required, Validators.email]],
        upassword: ['', [Validators.required, Validators.minLength(4)]],
      },
      (err: string | number) => {
        console.log('Some Error occured', +err);
      }
    );
  }

  signUp() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.http
        .post<any>('http://localhost:3000/users', this.signupForm.value)
        .subscribe((res: any) => {
          console.log(res);
          alert('Signup successfull');
          this.signupForm.reset();
          this.router.navigate(['/login']);
        });
    } else {
      alert('Please enter valid credentials');
    }
  }

  onClickLogin() {
    this.router.navigate(['/login']);
  }
}
