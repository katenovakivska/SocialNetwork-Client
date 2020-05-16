import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request';
import { RequestService } from 'src/app/services/request.service/request.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { User } from 'src/app/models/user';
import { Friendship } from 'src/app/models/friendship';
import { FriendService } from 'src/app/services/friend.service/friend.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  sendRequests: Array<Request>;
  receivedRequests: Array<Request>;
  message: string;
  users: Array<User>;


  constructor(
    private requestService: RequestService,
    public userService: UserService,
    private friendService: FriendService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getSendRequests();
    this.getReceivedRequests();
  }

  onCreateRequest(receiverName: string) {
    const request = new Request();
    request.receiverName = receiverName;
    request.status = "not confirmed";
    this.requestService.createRequest(request, this.userService.getToken())
    .subscribe(() => {this.getSendRequests();this.getReceivedRequests()}, err => this.message = 'Error');
  }

  onCreateFriendship(friendName: string) {
    const friendship = new Friendship();
    friendship.friendName = friendName;
    this.friendService.createFriendship(friendship, this.userService.getToken())
    .subscribe(() => {this.getSendRequests();this.getReceivedRequests()}, err => this.message = 'Error');
  }

  getSendRequests(): void {
    this.requestService.getSendRequests(this.userService.getToken()).subscribe(sendRequests => { this.sendRequests = sendRequests; });
  }

  getReceivedRequests(): void {
    this.requestService.getReceivedRequests(this.userService.getToken()).subscribe(receivedRequests => { this.receivedRequests = receivedRequests; });
  }

  getUsers(): void {
    this.userService.getUsers(this.userService.getToken()).subscribe(users => {this.users = users;});
  }

  onDeleteRequest(requestId: number): void {
    this.requestService.deleteRequest(requestId, this.userService.getToken()).subscribe(() => {this.getSendRequests();this.getReceivedRequests()}, err => this.message = 'Error');
  }
}
