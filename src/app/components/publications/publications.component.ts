import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { Comment } from 'src/app/models/comment';
import { PublicationService } from '../../services/publication.service/publication.service';
import { UserService } from 'src/app/services/user.service/user.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  publications: Array<Publication>;
  message: string;
  constructor(
    private publicationsService: PublicationService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.getPublications();
  }

  onCreatePublication(publicationText: string) {
    const publication = new Publication();
    publication.publicationText = publicationText;
    publication.photo = "photo";
    publication.comments = new Array<Comment>();
    this.publicationsService.createPublication(publication, this.userService.getToken()).subscribe(() => this.getPublications(), err => this.message = 'Error');
  }

  getPublications(): void {
    this.publicationsService.getPublications(this.userService.getToken()).subscribe(publictions => { this.publications = publictions; });
  }

}
