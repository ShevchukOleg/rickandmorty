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

  public subscriptions: Array<Subscription> = [];

  public character: SingleSharacter;

  constructor(
    private route: ActivatedRoute,
    public dataService: RickandmortyService
    ) { }

  public curentCharacterId: string;

  ngOnInit() {
    this.curentCharacterId = this.route.snapshot.paramMap.get('id');
    console.log(this.curentCharacterId);
    this.dataService.getCharacter(this.curentCharacterId);


    this.subscriptions.push(
      this.dataService.singleCharacterObservableSubject.subscribe(
        (data: SingleSharacter) => {
          if (!!data.id) {
            this.character = Object.assign(data);
          } else {
            console.log('Starting stage in component:', data);
          }
        },
        (error) => console.error(error)
      )
    );

    console.log(this.character);
  }
}
