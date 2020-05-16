import { Injectable } from '@angular/core';
import { Friendship } from 'src/app/models/friendship';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Publication } from 'src/app/models/publication';
import { Like } from 'src/app/models/like';
import { Comment } from 'src/app/models/comment';
import { UserComment } from 'src/app/models/userComment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(
    private http: HttpClient
  ) { }

  friendshipsApiUri = 'https://localhost:44383/api/friendships';
  likesApiUri = 'https://localhost:44383/api/like';
  publicationsApiUri = 'https://localhost:44383/api/publications';
  commentsApiUri = 'https://localhost:44383/api/comments';
  exist = 'exists';

  createFriendship(friendship: Friendship, token: Token): Observable<Friendship> {
    const url = this.friendshipsApiUri;
    friendship.userName = token.userName;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.post<Friendship>(url, friendship, { headers });
  }

  getFriends(token: Token): Observable<Array<User>> {
    const url = `${this.friendshipsApiUri}`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.get<Array<User>>(url, { headers });
  }

  getFriend(userName: string, token: Token): Observable<User> {
    const url = `${this.friendshipsApiUri}/${userName}`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.get<User>(url, { headers });
  }

  getFriendPublications(userName: string, token: Token): Observable<Array<Publication>> {
    const url = `${this.friendshipsApiUri}/${userName}/publications`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.get<Array<Publication>>(url, { headers });
  }

 
  createLike(like: Like, token: Token): Observable<Like> {
    const url = `${this.likesApiUri}`;
    like.userName = token.userName;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.post<Like>(url, like, { headers });
  }

  createComment(comment: Comment, token: Token): Observable<Comment> {
    const url = `${this.commentsApiUri}`;
    comment.userName = token.userName;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.post<Comment>(url, comment, { headers });
  }

  getLikeUsers(id, token: Token): Observable<Array<User>> {
    const url = `${this.likesApiUri}/${id}`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.get<Array<User>>(url, { headers });
  }

  getCommentUsers(id, token: Token): Observable<Array<UserComment>> {
    const url = `${this.commentsApiUri}/${id}`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.get<Array<UserComment>>(url, { headers });
  }
  likeExist(id, token: Token): Observable<boolean> {
    const url = `${this.likesApiUri}/${this.exist}/${id}`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.get<boolean>(url, { headers });
  }
}
