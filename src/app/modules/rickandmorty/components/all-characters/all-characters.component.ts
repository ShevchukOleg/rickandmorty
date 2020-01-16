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
   * Я розумію що пагінація не працюватиме коректно якщо на сервері буде менше 3 торінок
   */
  public paginationSettings = {
    curentPage: 1,
    interval: [1, 2, 3],
    pages: 3
  };

  public sortingBy = 'none';

  /**
   * параметри для селекту керування фільтром
   */
  public sortingOptions = [
    { value: 'none', viewValue: 'No' },
    { value: 'up', viewValue: 'A-Z' },
    { value: 'down', viewValue: 'Z-A' }
  ];

  constructor(
    public dataService: RickandmortyService
  ) { }

  /**
   * при старті компоненти здійснюється запит через сервіс на надання данних для відображення
   * формується колекція підписок на спостерігачі
   * для уникнення втрати контексту відображення LocalStorage викор для кординації поточної сторінки пагінації
   * дані отриманні від сервісу перевіряються та розформатовуються на окремі складові
   * у випадку помилки данні виводяться в консоль
   */
  ngOnInit() {
    /**
     * prospectivePage - данні про сторінкк на якій було припинуто перегляд списку
     */
    const prospectivePage = localStorage.getItem('pagination page');
    if (!!prospectivePage) {
      console.log(`Page number: (${prospectivePage}) resived from Local storage`);
      this.setPageConfiguration(+prospectivePage, +localStorage.getItem('pages'));
    }
    /**
     * алгоритм запиту данний про потрібну сторінку переліку персонажів
     */
    this.dataService.getCharactersPage(this.paginationSettings.curentPage);
    this.subscriptions.push(
      this.dataService.charactersPageObservableSubject.subscribe(
        (data: ServerResponse) => {
          if (!!data.info) {
            this.characters = Object.assign(data.results);
            this.pageInfo = Object.assign(data.info);
            this.paginationSettings.pages = this.pageInfo.pages;
            localStorage.setItem('pagination page', this.paginationSettings.curentPage.toString());
            localStorage.setItem('pages', this.paginationSettings.pages.toString());
            console.log('Characters and pageInfo in component', data);
          } else {
            console.log('Data not yet received from server');
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
   * setPageConfiguration - задає параметри відображення пагінації згідно до данних
   * сервера про кількість сторінок та положення перегляду списку
   * @param page - поточна сторінка
   * @param totalP - загальна кількість сторінок
   */
  public setPageConfiguration(page: number, totalP: number) {
    this.paginationSettings = {
      curentPage: page,
      interval: [],
      pages: totalP
    };

    switch (true) {
      case (page === totalP):
        this.paginationSettings.interval = [page - 2, page - 1, page];
        break;
      case (page === 1):
        this.paginationSettings.interval = [page, page + 1, page + 2];
        break;
      default:
        this.paginationSettings.interval = [page - 1, page, page + 1];
    }
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

  public changeSortingOrder(order) {
    console.log(order);
    this.sortingBy = order;
  }

}
