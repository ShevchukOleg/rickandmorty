import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-character',
  templateUrl: './single-character.component.html',
  styleUrls: ['./single-character.component.scss']
})
export class SingleCharacterComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  public curentCharacterId: string;

  ngOnInit() {
    this.curentCharacterId = this.route.snapshot.paramMap.get('id');
    console.log(this.curentCharacterId);
  }

}
