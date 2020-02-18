import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { SingleSharacter } from '../../interfaces/singleSharacter.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-character',
  templateUrl: './single-character.component.html',
  styleUrls: ['./single-character.component.scss']
})
export class SingleCharacterComponent implements OnInit {
/**
 * колекція підписок на данні від спостерігачів
 */
  public subscriptions: Array<Subscription> = [];
/**
 * character - данні про персонаж
 */
  public character: SingleSharacter;

  constructor(
    private route: ActivatedRoute,
    public dataService: RickandmortyService
    ) { }
/**
 * curentCharacterId - ідентифікатор персонажу
 */
  public curentCharacterId: string;
 /**
  * при старті компонети визначається ідентифікатор персонажу, здійснюється запит через
  * сервіс, оформлюється підписка на данні від спостерігачів сервісу
  */
  ngOnInit() {
    this.curentCharacterId = this.route.snapshot.paramMap.get('id');
    this.dataService.getCharacter(this.curentCharacterId);

    this.subscriptions.push(
      this.dataService.singleCharacterObservableSubject.subscribe(
        (data: SingleSharacter) => {
          if (!!data.id) {
            this.character = Object.assign({}, data);
          } else {
            console.log('Starting info:', data);
          }
        },
        (error) => console.error(error)
      )
    );
  }
}
