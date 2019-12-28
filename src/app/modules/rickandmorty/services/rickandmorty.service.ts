import { Injectable } from '@angular/core';
import { ServerResponse } from '../interfaces/serverResponse.interface';
import { SingleSharacter } from '../interfaces/singleSharacter.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {

  /**
   * URL додатку
   */
  private apiUrl: string = environment.apiUrl;

  public temporaryStorage = new Map();

  private charactersPageSource = new BehaviorSubject({});
  public charactersPageObservableSubject = this.charactersPageSource.asObservable();

  private singleCharacterSource = new BehaviorSubject({});
  public singleCharacterObservableSubject = this.singleCharacterSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  public getCharactersPage(page: number): void {
    console.log('Start service get request');
    if (this.temporaryStorage.has(page)) {
      this.charactersPageSource.next(Object.assign(this.temporaryStorage.get(page)));
    } else {
      const options = (page !== 0) ? { params: new HttpParams().append('page', page.toString()) } : {};

      this.http.get<ServerResponse>(`${this.apiUrl}/character`, options).subscribe(
        (response: ServerResponse) => {
          console.log(response);
          this.temporaryStorage.set(page, response);
          console.log(this.temporaryStorage);
          this.charactersPageSource.next(Object.assign(response));
        },
        (error) => console.error(error)
      );
    }
  }

  getCharacter(characterId: string) {
    const pageNumber = 1 + Math.floor(+characterId / 20);
    console.log(pageNumber);
    if (this.temporaryStorage.has(pageNumber) ) {
      const [curentCharacter] = this.temporaryStorage.get(pageNumber).results.filter( item => item.id === +characterId);
      this.singleCharacterSource.next(curentCharacter);
    } else {
      this.http.get<SingleSharacter>(`${this.apiUrl}/character/${characterId}`).subscribe(
        (response: SingleSharacter) => {
          console.log(response);
          this.singleCharacterSource.next(Object.assign(response));
        },
        (error) => console.error(error)
      );
    }
  }
}
