import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoronaService {
  constructor(private http: HttpClient) {}

  public getCountry(): Observable<any> {
    const url = 'https://api.covid19api.com/countries';
    return this.http.get<any>(url);
  }

  public worldReports(): Observable<any> {
    const url = 'https://api.covid19api.com/summary';
    return this.http.get<any>(url);
  }

  public countryReports(country: any): Observable<any> {
    const url =
      'https://api.covid19api.com/live/country/' +
      country +
      '/status/confirmed';
    return this.http.get<any>(url);
  }
}
