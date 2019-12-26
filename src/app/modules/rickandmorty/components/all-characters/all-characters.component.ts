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

  public subscriptions: Array<Subscription> = [];

  public characters: Array<SingleSharacter> = [];

  public pageInfo;
  public curentPage = 2;

  constructor(
    public dataService: RickandmortyService
  ) { }


  ngOnInit() {
    console.log('Init');
    this.dataService.getCharactersPage(this.curentPage);
    this.subscriptions.push(
      this.dataService.charactersPageObservableSubject.subscribe(
        (data: ServerResponse) => {
          if (!!data.info) {
            this.characters = Object.assign(data.results);
            this.pageInfo = Object.assign(data.info);
            console.log('Characters and pageInfo in component', (this.pageInfo));
          } else {
            console.log('Starting stage in component:', data);
          }
        },
        (error) => console.error(error)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => {
        subscription.unsubscribe();
        subscription = null;
      }
    );
    this.subscriptions = [];
  }

}
