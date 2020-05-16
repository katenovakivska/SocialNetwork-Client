import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from 'src/app/models/publication';
import { Token } from 'src/app/models/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(
    private http: HttpClient
  ) { }

  publicationsApiUri = 'https://localhost:44383/api/publications';
  commentsApiUri = 'https://localhost:44383/api/comments';

  createPublication(publication: Publication, token: Token): Observable<Publication> {
    const url = this.publicationsApiUri;
    publication.userName = token.userName;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.post<Publication>(url, publication, { headers });
  }
  getPublications(token: Token): Observable<Array<Publication>> {
    const url = this.publicationsApiUri;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.get<Array<Publication>>(url, { headers });
  }

  uploadImage(imageToUpload: File,publicationId: number, token: Token){
    const url = `${this.publicationsApiUri}/${publicationId}`;
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({ Authorization: token.token });
    formData.append('Image', imageToUpload, imageToUpload.name);
    return this.http.post(url, formData, { headers, reportProgress: true});
  }
  deletePublication(publicationId: number, token: Token): Observable<Publication> {
    const url = `${this.publicationsApiUri}/${publicationId}`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.delete<Publication>(url, { headers });
  }
  deleteComment(commentId: number, token: Token): Observable<Comment> {
    const url = `${this.commentsApiUri}/${commentId}`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.delete<Comment>(url, { headers });
  }
}
