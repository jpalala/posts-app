import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from '../post';

import { PostService } from '../services/post.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent {
  postId = 0;
  posts$: Observable<any> | undefined;
  selectedId: number | undefined;
  post$: Observable<Post> | undefined;
  post: any;

  status = '';
  constructor(private http: HttpClient,
    private route: ActivatedRoute, 
    private postService: PostService,
    private location: Location
  ) {}

  // ngOnInit() {
  //   this.posts$ = this.route.paramMap.pipe(
  //     switchMap(params => {
  //       this.selectedId = Number(params.get('id'));
  //       return this.postService.getPosts(this.selectedId);
  //     })
  //   );

  //  /* this.route.queryParams.subscribe(params => {
  //     this.postId = params['postId'];
  //   });
  //   */
  // }

  ngOnInit(): void {
   this.getPost();
  }

  getPost(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.postService.getPost(id)
      .subscribe(post => this.post = post);
  }


  goBack(): void {
    this.location.back();
  }

  delete() {

     if (this.post) {
      this.postService.deletePost(this.post)
        .subscribe(() => this.goBack());
    }
  
    const postId = this.route.snapshot.paramMap.get('id');
    this.http.delete('https://jsonplaceholder.typicode.com/posts/' + postId)
    .subscribe(() => this.status = 'Delete successful');
  }
}
