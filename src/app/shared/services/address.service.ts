import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../interfaces/address/address';

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

  // Method to get village by ID
 getVillageById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get`, {
      params: { id }
    });
  }

  getGramPanchayats(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/get-grampanchayats`);
  }
  

}
