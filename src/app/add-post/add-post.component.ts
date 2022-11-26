import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  private url = 'http://jsonplaceholder.typicode.com/posts';
  model = new Post(1 , 1, 'Title of your post',  'Blah blah blah');
  submitted = false;

  constructor(private postService: PostService) {}

  onSubmit() { 
    this.submitted = true; 
    this.sendRequest(this.model); 
  }

  sendRequest(post: Post) {
    post.id = + new Date(); //replace id with something random (so no collision)
    this.postService.newPost(post);
  }

}
