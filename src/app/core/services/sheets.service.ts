import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SheetsService {
  /**
   * Submit data to a Google Sheets-connected Google Apps Script web app.
   * Set SHEETS_ENDPOINT in environment files before use.
   */
  constructor(private http: HttpClient) {}

  submitToSheet(data: Record<string, unknown>): Promise<void> {
    // TODO: Replace with your Apps Script endpoint
    const endpoint = '';
    return this.http.post<void>(endpoint, data).toPromise();
  }
}
