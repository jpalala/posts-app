import { Component } from '@angular/core';
import { PostService } from './services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from './post';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Awesome Blogger';
  posts: any;
  selectedId!: number;

  totalPosts: number = 100;
  pagination: number = 1;
  
  constructor(private postService: PostService, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
     this.postService.getPosts(this.pagination).subscribe(
      response => {
        this.posts = response;
        console.log(this.posts);
      }
    );
   
  }


  renderPage(event: number) {
    this.pagination = event;
    this.fetchPosts();
  }
}
