import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Users } from '../models/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: Users[];
  showUsersModal: boolean = false;
  editUsersMode: boolean = false;
  usersForm!: FormGroup;
  constructor(
    private router: Router,
    private authservice: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.usersForm = this.fb.group(
      {
        _id: '',
        ufname: ['', [Validators.required]],
        ulname: ['', [Validators.required]],
        umobile: ['', [Validators.required]],
        uemail: ['', [Validators.required, Validators.email]],
        upassword: ['', [Validators.required, Validators.minLength(4)]],
        uDate: ['', [Validators.required]],
        urole: ['', [Validators.required]],
      },
      (err: string | number) => {
        console.log('Some Error occured', +err);
      }
    );
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['/landing']);
  }

  onEditUser(user: Users) {
    this.showUsersModal = true;
    this.usersForm.patchValue(user);
  }

  getUsers() {
    this.authservice.getUsersList().subscribe((res: Users[]) => {
      console.log(res);
      this.users = res;
    });
  }

  onDeleteUser(id: any) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.authservice.deleteUers(id).subscribe(
        (res) => {
          console.log(res);
          this.getUsers();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onCloseUsersModal() {
    this.usersForm.reset();
    this.showUsersModal = false;
  }

  onUserSubmit() {
    this.authservice.updateUsers(this.usersForm.value).subscribe(
      (res) => {
        this.getUsers();
        this.onCloseUsersModal();
        alert('User Details successfully updated!!!');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
