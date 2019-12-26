import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCharactersComponent } from './components/all-characters/all-characters.component';
import { SingleCharacterComponent } from './components/single-character/single-character.component';
import { RandmRoutingModule } from './randm-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AllCharactersComponent, SingleCharacterComponent],
  imports: [
    CommonModule,
    RandmRoutingModule,
    NgbModule
  ]
})
export class RickandmortyModule { }
