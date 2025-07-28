import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:9096/address';

  constructor(private http: HttpClient) { }

  // Fetch addresses from the backend
  getAddresses(): Observable<any[]> {
    return this.http.get<string[]>(`${this.apiUrl}/get-all-address`);
    
  }
}
