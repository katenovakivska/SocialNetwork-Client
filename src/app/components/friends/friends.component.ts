import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service/friend.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: Array<User>;
  
  constructor(
    private friendService: FriendService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends(): void {
    this.friendService.getFriends(this.userService.getToken()).subscribe(friends => { this.friends = friends; });
  }

  showFriendPage(userName: string): void {
    this.router.navigate(['/friend-page',userName]);
  }

 
}
