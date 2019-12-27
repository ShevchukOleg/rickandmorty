import { Component, OnInit, OnDestroy } from '@angular/core';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { ServerResponse } from '../../interfaces/serverResponse.interface';
import { SingleSharacter } from '../../interfaces/singleSharacter.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.scss']
})
export class AllCharactersComponent implements OnInit, OnDestroy {
  /**
   * subscriptions - колекція всіх підписок на спостерігачі від поточного класу
   */
  public subscriptions: Array<Subscription> = [];
  /**
   * characters - перелік персонажів для відображення в шаблоні
   */
  public characters: Array<SingleSharacter> = [];
  /**
   *  pageInfo - інформація від серверу про поточну сторінку для відображення
   */
  public pageInfo;
  /**
   * paginationSettings - об'єкт параметрів пагінації
   */
  public paginationSettings = {
    curentPage: 1,
    interval: [1, 2, 3],
    pages: 3
  };

  constructor(
    public dataService: RickandmortyService
  ) { }

  /**
   * при старті компоненти здійснюється запит через сервіс на надання данних для відображення
   * формується колекція підписок на спостерігачі
   * дані отриманні від сервісу перевіряються та розформатовуються на окремі складові
   * у випадку помилки данні виводяться в консоль
   */
  ngOnInit() {
    console.log('Init');
    this.dataService.getCharactersPage(this.paginationSettings.curentPage);
    this.subscriptions.push(
      this.dataService.charactersPageObservableSubject.subscribe(
        (data: ServerResponse) => {
          if (!!data.info) {
            this.characters = Object.assign(data.results);
            this.pageInfo = Object.assign(data.info);
            this.paginationSettings.pages = this.pageInfo.pages;
            console.log('Characters and pageInfo in component', data);
          } else {
            console.log('Starting stage in component:', data);
          }
        },
        (error) => console.error(error)
      )
    );
  }

  /**
   * при завершенні роботи компоненти здійснюється відписка для уникнення витоку пам'яті та помилок дуплікації
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => {
        subscription.unsubscribe();
        subscription = null;
      }
    );
    this.subscriptions = [];
  }

  /**
   * loadPage - метод переходу між лимтами таблиці персонажів по пагінації без роутингу
   * @param e - подія з шаблону що несе параметри переходу
   */
  public loadPage(e) {
    // блок для навігації по пагінації при натисненні на номер стрінки
    if (isFinite(e.target.textContent)) {
      this.paginationSettings.curentPage = (+e.target.textContent);
      this.dataService.getCharactersPage(this.paginationSettings.curentPage);
    } else
      // блок для навігації переходів за допомогою кнопок "Попередня" та "Наступна"
      if (e.target.hasAttribute('data-action') && e.target.getAttribute('data-action') === 'next') {
        switch (true) {
          case (this.paginationSettings.interval.includes(this.paginationSettings.curentPage + 1)):
            this.paginationSettings.curentPage += 1;
            this.dataService.getCharactersPage(this.paginationSettings.curentPage);
            break;
          default:
            if (this.paginationSettings.curentPage < this.paginationSettings.pages) {
              this.paginationSettings.curentPage += 1;
              const curentPage = this.paginationSettings.curentPage;
              this.paginationSettings.interval = [curentPage - 2, curentPage - 1, curentPage];
              this.dataService.getCharactersPage(this.paginationSettings.curentPage);
            } else {
              // Ця дія обмежена в шаблоні через запобігання події натиснення на кнопку
              console.log('The last page');
            }
        }
      } else if (e.target.hasAttribute('data-action') && e.target.getAttribute('data-action') === 'prev') {
        switch (true) {
          case (this.paginationSettings.interval.includes(this.paginationSettings.curentPage - 1)):
            this.paginationSettings.curentPage -= 1;
            this.dataService.getCharactersPage(this.paginationSettings.curentPage);
            break;
          default:
            if (this.paginationSettings.curentPage > 1) {
              this.paginationSettings.curentPage -= 1;
              const curentPage = this.paginationSettings.curentPage;
              this.paginationSettings.interval = [curentPage, curentPage + 1, curentPage + 2];
              console.log(this.paginationSettings.interval);
              this.dataService.getCharactersPage(this.paginationSettings.curentPage);
            } else {
              // Ця дія обмежена в шаблоні через запобігання події натиснення на кнопку
              console.log('The first page');
            }
        }
      }
  }

}
