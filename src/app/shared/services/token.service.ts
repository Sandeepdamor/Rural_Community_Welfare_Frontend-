import { Injectable } from '@angular/core';
import { Role } from '../../enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private TOKEN_KEY = 'authToken';
  private ACCESS_TOKEN_KEY = 'accessToken';

  constructor() { }

  // Save Auth token in localStorage
  saveAuthToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Save Access token in localStorage
  saveAccessToken(token: string): void {
    console.log('Save Access Token => ', token);
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  // Get Auth token from localStorage
  getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  // Get Access token from localStorage
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  // Clear Tokens
  clearTokens() {
    localStorage.removeItem('authToken'); // Remove the auth token from localStorage
    localStorage.removeItem('accessToken'); // Remove the access token from localStorage
  }
  // Clear Auth Tokens
  clearAuthTokens() {
    localStorage.removeItem('authToken'); // Remove the auth token from localStorage
  }

  // Clear Access Tokens
  clearAccessTokens() {
    localStorage.removeItem('accessToken'); // Remove the access token from localStorage
  }

  // Extract Mobile Number from Token (If stored inside JWT)
  getMobileNumberFromAuthToken(): string | null {
    const token = this.getAuthToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        return payload?.sub || null; //Mobile number is stored in "sub"
      } catch (e) {
        console.error('Error decoding token', e);
        return null;
      }
    }
    return null;
  }

  // Extract Mobile Number from Access Token (If stored inside JWT)
  getMobileNumberFromAccessToken(): string | null {
    const token = this.getAccessToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        return payload?.sub || null; // ✅ Mobile number is stored in "sub"
      } catch (e) {
        console.error('Error decoding token', e);
        return null;
      }
    }
    return null;
  }

  /// Extract Role from Token (JWT Decoding)
  getRoleFromToken(): Role | null {
    const token = this.getAccessToken(); // Get token from localStorage
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload

      // ✅ Ensure 'roleType' exists and is a valid RoleEnum
      if (payload?.roleType && Object.values(Role).includes(payload.roleType)) {
        return payload.roleType as Role;
      }

      console.warn('Invalid roleType in token:', payload?.roleType);
      return null;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  /// Extract Role from Token (JWT Decoding)
  getRoleFromAuthToken(): Role | null {
    const token = this.getAuthToken(); // Get token from localStorage
    console.log('TOKEN GET FROM LOCAL STORAGE = > ', token);
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload

      // ✅ Ensure 'roleType' exists and is a valid RoleEnum
      if (payload?.roleType && Object.values(Role).includes(payload.roleType)) {
        return payload.roleType as Role;
      }

      console.warn('Invalid roleType in token:', payload?.roleType);
      return null;

    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }


  // TokenService.ts
  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload?.exp;

      if (!expiry) return true;

      const now = Math.floor(Date.now() / 1000); // current time in seconds
      return expiry < now;
    } catch (e) {
      console.error('Error decoding token:', e);
      return true;
    }
  }
}
