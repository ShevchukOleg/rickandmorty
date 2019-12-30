import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCharactersComponent } from './components/all-characters/all-characters.component';
import { SingleCharacterComponent } from './components/single-character/single-character.component';
import { RandmRoutingModule } from './randm-routing.module';
import { SortByNamePipe } from './pipes/sort-by-name.pipe';

@NgModule({
  declarations: [AllCharactersComponent, SingleCharacterComponent, SortByNamePipe],
  imports: [
    CommonModule,
    RandmRoutingModule
  ]
})
export class RickandmortyModule { }
