import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgressAnimationComponent } from './components/progress-animation/progress-animation.component';

const routes: Routes = [
  {path: '', component: ProgressAnimationComponent},
  {path: '**', redirectTo: 'all-characters', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressAnimationRoutingModule { }
