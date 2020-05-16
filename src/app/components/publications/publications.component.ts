import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { Comment } from 'src/app/models/comment';
import { PublicationService } from '../../services/publication.service/publication.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { User } from 'src/app/models/user';
import { FriendService } from 'src/app/services/friend.service/friend.service';
import { UserComment } from 'src/app/models/userComment';


@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  publications: Array<Publication>;
  urlImage: string = "/assets/img/default.jpg";
  imageToUpload: File = null;
  message: string;
  publication: Publication;
  isShow = false;
  pubId: number;
  likers: Array<User>;
  userComments: Array<UserComment>;
  id: number;

  constructor(
    private publicationsService: PublicationService,
    public userService: UserService,
    private friendService: FriendService
  ) { }

  ngOnInit(): void {
    this.getPublications();
  }

  handleImageToInput(file: FileList){
    this.imageToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
    this.urlImage = event.target.result;
    }
    reader.readAsDataURL(this.imageToUpload);
  }

  OnSubmit(Image, publicationId: number){
    this.publicationsService.uploadImage(this.imageToUpload,publicationId, this.userService.getToken()).subscribe(
      data =>{
        console.log('done');
        Image.value = null;
        this.urlImage = '/assets/img/default.jpg';
      },() => this.getPublications()
    );
  }

  onCreatePublication(publicationText: string) {
    const publication = new Publication();
    publication.publicationText = publicationText;
    publication.comments = new Array<Comment>();
    this.publicationsService.createPublication(publication, this.userService.getToken())
    .subscribe(() => this.getPublications(), err => this.message = 'Error');
  }

  getPublications(): void {
    this.publicationsService.getPublications(this.userService.getToken()).subscribe(publictions => { this.publications = publictions; });
  }

  onDeletePublication(publicationId: number): void {
    this.publicationsService.deletePublication(publicationId, this.userService.getToken()).subscribe(() => this.getPublications());
  }

  getLikeUsers(id: number)
  {
    this.friendService.getLikeUsers(id, this.userService.getToken())
    .subscribe(likers => {this.likers = likers;});
  }

  getCommentUsers(id: number)
  {
    this.id = id;
    this.friendService.getCommentUsers(id, this.userService.getToken())
    .subscribe(userComments => {this.userComments = userComments;});
  }

  deleteComment(commentId: number)
  {
    this.publicationsService.deleteComment(commentId, this.userService.getToken()).subscribe(() => this.getCommentUsers(this.id));
  }
}
