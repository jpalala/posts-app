import { Component } from '@angular/core';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Awesome Blogger';
  posts: any;
  totalPosts: number = 100;
  pagination: number = 1;
  
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
    console.log(this.fetchPosts());
  }

  fetchPosts() {
    this.postService.getPosts(this.pagination).subscribe(
      data => {
        this.posts = data;
        console.log(this.posts);
      }
    );
  }

  renderPage(event: number) {
    this.pagination = event;
    this.fetchPosts();
  }
}
