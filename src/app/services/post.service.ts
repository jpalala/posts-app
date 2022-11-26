import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Post } from '../post';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getPosts(page: number = 0): Observable<Post[]> {
    if(!page) {
      return this.http.get<Post[]>(this.url)
      .pipe(
        tap(posts => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
    }
    // if paged (TODO)
    return this.http.get<Post[]>(this.url + '?page=' + page);
  }

  getPost(id: number): Observable<Post> {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Post>(`getHero id=${id}`))
    );
  }

  newPost(post: Post) {
    
  }

  /** DELETE: delete the hero from the server */
  deletePost(id: number): Observable<Post> {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    return this.http.delete<Post>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Post>('deleteHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }
}
