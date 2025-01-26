import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = 'http://localhost:8080/user';

  constructor(private readonly httpClient: HttpClient) {
  }

  getUser(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(`${this.apiUrl}`, {headers});
  }

  getAdminTest(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(`${this.apiUrl}/admin-test`, {headers});
  }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders();
    }
  }
}
