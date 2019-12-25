import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressAnimationComponent } from './components/progress-animation/progress-animation.component';
import { ProgressAnimationRoutingModule } from './progress-animation-routing.module';



@NgModule({
  declarations: [ProgressAnimationComponent],
  imports: [
    CommonModule,
    ProgressAnimationRoutingModule
  ]
})
export class ProgressAnimationModule { }
