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

/**
 * temporaryStorage - сховище данних для швидкого підвантаження відвіданих сторінок
 * розумію що концепція не досконнала для ркоменційного сайту через можливість онослення
 * колекції данних на сервері у вже переглянутих торінках.
 * реалізовано з метою зменшення кількості запитів тестовго проекту
 */
  public temporaryStorage = new Map();


/**
 * реалізація концепції спостерігач - сабскрайбер
 */
  private charactersPageSource = new BehaviorSubject({});
  public charactersPageObservableSubject = this.charactersPageSource.asObservable();

  private singleCharacterSource = new BehaviorSubject({});
  public singleCharacterObservableSubject = this.singleCharacterSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  /**
   * getCharactersPage - метод для отримання колекції данних про персонажів
   * @param page - сторінка колекції
   */
  public getCharactersPage(page: number): void {
    console.log('Service trying to find the page:', page);
    if (this.temporaryStorage.has(page)) {
      console.log('Service find page in Temporary storage of servise');
      this.charactersPageSource.next(Object.assign(this.temporaryStorage.get(page)));
    } else {
      console.log('Service start asking server');
      const options = (page !== 0) ? { params: new HttpParams().append('page', page.toString()) } : {};

      this.http.get<ServerResponse>(`${this.apiUrl}/character`, options).subscribe(
        (response: ServerResponse) => {
          console.log('Server get response data:', response);
          this.temporaryStorage.set(page, response);
          console.log('Response has been saved in Temporary storage of servise',this.temporaryStorage);
          this.charactersPageSource.next(Object.assign(response));
        },
        (error) => console.error(error)
      );
    }
  }

  /**
   * getCharacter -  метод отримання данних про окремого персонажу
   * @param characterId - ідентифікатор персонажу
   */
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
