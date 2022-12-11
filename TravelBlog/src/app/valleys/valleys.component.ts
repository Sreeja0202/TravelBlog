import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Posts } from '../models/posts';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-valleys',
  templateUrl: './valleys.component.html',
  styleUrls: ['./valleys.component.css'],
})
export class ValleysComponent implements OnInit {
  showPostsModal: boolean = false;
  editPostsMode: boolean = false;
  postsForm!: FormGroup;
  posts!: Posts[];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private postservice: PostsService,
    public authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.postsForm = this.fb.group({
      _id: '',
      location: ['', [Validators.required]],
      desc: [''],
      geoMap: [''],
      photourl: [''],
      pemail: this.authservice.userData.email,
    });
  }

  onPostSubmit() {
    if (this.postsForm.valid) {
      if (this.editPostsMode) {
        this.postservice.updatePostsValleys(this.postsForm.value).subscribe(
          (res) => {
            this.getPosts();
            this.onClosePostsModal();
            alert('Post successfully updated!!!');
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.postservice.addpostsValleys(this.postsForm.value).subscribe(
          (res: any) => {
            this.getPosts();
            this.onClosePostsModal();
            this.onReset();
            alert('Successfully Posted!!!');
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    } else {
      alert('Please enter valid details');
    }
  }

  onReset() {
    this.postsForm.setValue({
      _id: '',
      location: [''],
      desc: [''],
      geoMap: [''],
      photourl: [''],
      pemail: this.authservice.userData.email,
    });
  }

  onEditPosts(posts: Posts) {
    this.editPostsMode = true;
    this.showPostsModal = true;
    this.postsForm.patchValue(posts);
  }

  getPosts() {
    this.postservice.getPostsListValleys().subscribe((res: Posts[]) => {
      console.log(res);
      this.posts = res;
    });
  }

  onDeletePosts(id: any) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postservice.deletePostsValleys(id).subscribe(
        (res) => {
          console.log(res);
          this.getPosts();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  logoutUser() {
    this.router.navigate(['/landing']);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }

  onAddPosts() {
    this.showPostsModal = true;
  }

  onClosePostsModal() {
    this.postsForm.reset();
    this.showPostsModal = false;
    this.editPostsMode = false;
  }
}
