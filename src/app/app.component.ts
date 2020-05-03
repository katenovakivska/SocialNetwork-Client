import { Component } from '@angular/core';
import { UserService } from './services/user.service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socialnetwork';

  constructor(
    public userService: UserService
  ) { }

  onLogout(): void {
    this.userService.deleteToken();
  }
}