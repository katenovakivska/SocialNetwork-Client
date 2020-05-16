import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from 'src/app/services/friend.service/friend.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { User } from 'src/app/models/user';
import { Publication } from 'src/app/models/publication';
import { Like } from 'src/app/models/like';
import { Comment } from 'src/app/models/comment';
import { UserComment } from 'src/app/models/userComment';

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend-page.component.html',
  styleUrls: ['./friend-page.component.css']
})
export class FriendPageComponent implements OnInit {

  userName: string;
  friend: User;
  friendPublications: Array<Publication>;
  likers: Array<User>;
  userComments: Array<UserComment>;
  inputComment: string;
  existLike: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private friendService: FriendService,
    public userService: UserService
  ) { 
    this.userName = route.snapshot.params['userName'];
  }

  ngOnInit(): void {
    this.getFriend();
    this.getPublications();  
  }

  getFriend(): void {
    this.friendService.getFriend(this.userName, this.userService.getToken()).subscribe(friend => { this.friend = friend; });
  }

  getPublications(){
    this.friendService.getFriendPublications(this.userName, this.userService.getToken()).subscribe(friendPublications => {this.friendPublications = friendPublications;});
  }


  createLike(id: number)
  {
    const like = new Like();
    like.publicationId = id;
    this.friendService.createLike(like, this.userService.getToken())
    .subscribe(() => this.getLikeUsers(id));
  }

  createComment(id: number, commentText: string)
  {
    const comment = new Comment();
    comment.publicationId = id;
    comment.commentText = commentText;
    this.friendService.createComment(comment, this.userService.getToken())
    .subscribe(() => {this.getCommentUsers(id); this.inputComment = '';});
  }

  getCommentUsers(id: number)
  {
    this.friendService.getCommentUsers(id, this.userService.getToken())
    .subscribe(userComments => {this.userComments = userComments;});
  }

  getLikeUsers(id: number)
  {
    this.friendService.getLikeUsers(id, this.userService.getToken())
    .subscribe(likers => {this.likers = likers;});
  }

  isLike(publicationId: number): boolean
  {
    this.friendService.likeExist(publicationId, this.userService.getToken())
    .subscribe(existLike => {this.existLike = existLike;});
    if(this.existLike == true)
    { return true;}
    else 
    {return false;}
  }
}
