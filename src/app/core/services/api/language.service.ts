import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Language} from '@core/models/Language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  public getTranslatorsLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${environment.authUrl}/language/translator/all`);
  }
}
