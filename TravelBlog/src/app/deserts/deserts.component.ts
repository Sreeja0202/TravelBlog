import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../posts.service';
import { Posts } from '../models/posts';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-deserts',
  templateUrl: './deserts.component.html',
  styleUrls: ['./deserts.component.css'],
})
export class DesertsComponent implements OnInit {
  showPostsModal: boolean = false;
  editPostsMode: boolean = false;
  postsForm!: FormGroup;
  @ViewChild('singleInput', { static: false })
  singleInput!: ElementRef;

  images: any;
  multipleImages!: [];
  displaySingleImage!: boolean;
  displaySingleImageArray!: [];
  posts!: Posts[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private postservice: PostsService,
    public authservice: AuthService
  ) {
    this.displaySingleImage = false;
  }

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

  // onPostsSubmit() {
  //   // construct formdata
  //   const formData = new FormData();
  //   formData.append('file', this.images);

  //   // post req
  //   this.http.post<any>('http://localhost:3000/file', formData).subscribe(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  onPostSubmit() {
    if (this.postsForm.valid) {
      if (this.editPostsMode) {
        this.postservice.updatePostsDeserts(this.postsForm.value).subscribe(
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
        this.postservice.addpostsDeserts(this.postsForm.value).subscribe(
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
    this.postservice.getPostsListDeserts().subscribe((res: Posts[]) => {
      console.log(res);
      this.posts = res;
    });
  }

  onDeletePosts(id: any) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postservice.deletePostsDeserts(id).subscribe(
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

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.images = file;
    }
  }
}
