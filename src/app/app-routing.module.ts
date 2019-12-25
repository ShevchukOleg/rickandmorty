import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'layout',
  loadChildren: () => import('./modules/progress-animation/progress-animation.module').then( mod => mod.ProgressAnimationModule)
  },
  {path: 'rickandmorty',
  loadChildren: () => import('./modules/rickandmorty/rickandmorty.module').then( mod => mod.RickandmortyModule)},
  { path: '', redirectTo: 'rickandmorty', pathMatch: 'full' },
  { path: '**', redirectTo: 'rickandmorty' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
