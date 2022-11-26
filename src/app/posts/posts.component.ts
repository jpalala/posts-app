import { Component } from '@angular/core';
import { Post } from '../post';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts: Post[] = [];
  posts$: Observable<any> | undefined;
  selectedId: number | undefined;
  
  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }
  fetchPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts.slice(1, 5));
  }
}
