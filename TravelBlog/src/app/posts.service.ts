import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from './models/posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  deserturl = 'http://localhost:3000/deserts';
  valleysurl = 'http://localhost:3000/valleys';
  seaurl = 'http://localhost:3000/seas';
  constructor(private http: HttpClient) {}

  // deserts
  addpostsDeserts(posts: Posts) {
    return this.http.post(this.deserturl, posts);
  }

  getPostsListDeserts() {
    return this.http.get<Posts[]>(this.deserturl);
  }

  deletePostsDeserts(id: any) {
    return this.http.delete(`${this.deserturl}/${id}`);
  }

  updatePostsDeserts(posts: Posts) {
    return this.http.put(`${this.deserturl}/${posts._id}`, posts);
  }

  // valleys
  addpostsValleys(posts: Posts) {
    return this.http.post(this.valleysurl, posts);
  }

  getPostsListValleys() {
    return this.http.get<Posts[]>(this.valleysurl);
  }

  deletePostsValleys(id: any) {
    return this.http.delete(`${this.valleysurl}/${id}`);
  }

  updatePostsValleys(posts: Posts) {
    return this.http.put(`${this.valleysurl}/${posts._id}`, posts);
  }

  // sea
  addpostsSeas(posts: Posts) {
    return this.http.post(this.seaurl, posts);
  }

  getPostsListSeas() {
    return this.http.get<Posts[]>(this.seaurl);
  }

  deletePostsSeas(id: any) {
    return this.http.delete(`${this.seaurl}/${id}`);
  }

  updatePostsSeas(posts: Posts) {
    return this.http.put(`${this.seaurl}/${posts._id}`, posts);
  }
}
