import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCharactersComponent } from './components/all-characters/all-characters.component';
import { SingleCharacterComponent } from './components/single-character/single-character.component';

const routes: Routes = [
  {path: 'all-characters', component: AllCharactersComponent},
  {path: 'character/:id', component: SingleCharacterComponent },
  {path: '', redirectTo: 'all-characters', pathMatch: 'full'},
  {path: '**', redirectTo: 'all-characters', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RandmRoutingModule { }
