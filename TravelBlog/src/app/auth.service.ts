import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from './models/posts';
import { Users } from './models/users';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  usersUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient, private postservice: PostsService) {
    const data = localStorage.getItem('userData');
    if (data) {
      this.userData = JSON.parse(data);
    }
  }

  IsloggedIn() {
    return !!localStorage.getItem('token');
  }

  HaveAccess() {
    var logintoken = localStorage.getItem('token') || '';
    console.log(logintoken);
    if (logintoken == '') {
      return false;
    }
    var extractedToken = logintoken.split('.')[1];
    var atobdata = atob(extractedToken);
    localStorage.setItem('userData', atobdata);
    this.userData = JSON.parse(atobdata);
    console.log(this.userData);
    if (
      this.userData.email === 'admin@gmail.com' &&
      this.userData.password === '123456'
    ) {
      return true;
    } else {
      return false;
    }
  }

  addusers(users: Users) {
    return this.http.post(this.usersUrl, users);
  }

  getUsersList() {
    return this.http.get<Users[]>(this.usersUrl);
  }

  deleteUers(id: any) {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

  updateUsers(users: Users) {
    return this.http.put(`${this.usersUrl}/${users._id}`, users);
  }
}
