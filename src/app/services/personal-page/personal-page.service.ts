import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Observable, Subscription } from 'rxjs';
import { Token } from '../../models/token';

@Injectable({
  providedIn: 'root'
})
export class PersonalPageService {

  userApiUri = 'https://localhost:44383/api/authentication';
  photoApiUri = 'https://localhost:44383/api/photo';

  constructor(
    private http: HttpClient
  ) { }

  getUserInfoByName(token: Token): Observable<User> {
    const url = `${this.userApiUri}`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.get<User>(url, { headers });
  }

  uploadImage(imageToUpload: File, token: Token){
    const url = `${this.photoApiUri}`;
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({ Authorization: token.token });
    formData.append('Image', imageToUpload, imageToUpload.name);
    return this.http.post(url, formData, { headers, reportProgress: true});
  }
}
