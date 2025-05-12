import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFormRecordSavedInDB } from '../interfaces/i-form-record-saved-in-db';
import { IType } from '../interfaces/i-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FakeBackendService {

  constructor(private _http: HttpClient) { }


  public getValuesForFormRecords(): Observable<IFormRecordSavedInDB[]> {
    return this._http.get<IFormRecordSavedInDB[]>('mockedRecords.json');
  }

  public getTypes(): IType[] {
    return [
      {
        label: 'general field',
        value: 'general'
      },
      {
        label: 'only for documentation',
        value: 'documentation'
      },
      {
        label: 'technical information',
        value: 'technical'
      }
    ]
  }

}
