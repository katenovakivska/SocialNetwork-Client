import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalPageService } from 'src/app/services/personal-page/personal-page.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { User } from 'src/app/models/user';
import { FriendService } from 'src/app/services/friend.service/friend.service';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css']
})
export class PersonalPageComponent implements OnInit {

  urlImage: string = "/assets/img/default.jpg";
  imageToUpload: File = null;
  message: string;
  user: User;
 

  constructor(
    private personalPageService: PersonalPageService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.personalPageService.getUserInfoByName(this.userService.getToken()).subscribe(user => this.user = user);
  }

  handleImageToInput(file: FileList){
    this.imageToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
    this.urlImage = event.target.result;
    }
    reader.readAsDataURL(this.imageToUpload);
  }

  OnSubmit(Image){
    this.personalPageService.uploadImage(this.imageToUpload, this.userService.getToken()).subscribe(
      data =>{
        console.log('done');
        Image.value = null;
        this.urlImage = '/assets/img/default.jpg';
      },() => this.getUser()
    );
  }

  onUpdate(email: string, phoneNumber: string, password: string)
  {
    const user = new User();
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.password = password;
    this.userService.updateUser(user, this.userService.getToken()).subscribe(res=>{this.router.navigate(['/personal-page'])});
  }

 
}
