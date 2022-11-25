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
    this.posts$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.postService.getPosts(0);
      })
    );
  }

}
