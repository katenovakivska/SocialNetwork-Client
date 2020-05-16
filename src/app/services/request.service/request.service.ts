import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from 'src/app/models/token';
import { Request } from 'src/app/models/request';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  requestsApiUri = 'https://localhost:44383/api/requests';

  createRequest(request: Request, token: Token): Observable<Request> {
    const url = this.requestsApiUri;
    request.userName = token.userName;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.post<Request>(url, request, { headers });
  }

  getSendRequests(token: Token): Observable<Array<Request>> {
    const url = `${this.requestsApiUri}/send`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.get<Array<Request>>(url, { headers });
  }

  getReceivedRequests(token: Token): Observable<Array<Request>> {
    const url = `${this.requestsApiUri}/received`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.get<Array<Request>>(url, { headers });
  }

  deleteRequest(requestId: number, token: Token): Observable<Request> {
    const url = `${this.requestsApiUri}/${requestId}`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.delete<Request>(url, { headers });
  }
}
