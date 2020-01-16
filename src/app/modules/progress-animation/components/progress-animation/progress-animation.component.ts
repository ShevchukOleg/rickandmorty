import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-animation',
  templateUrl: './progress-animation.component.html',
  styleUrls: ['./progress-animation.component.scss']
})
export class ProgressAnimationComponent implements OnInit {
  /**
   * progressValue - значення прогрессу строки прогрес бару
   */
  public progressValue: number;
  /**
   * властивість для збереження анімації прогрессу
   */
  public animate: any;

  constructor() { }

  ngOnInit() {
    this.progressValue = 75;
  }
  /**
   * runProgress - метод запуску анімації прогрес бару та конфігурації параметрів
   */
  public runProgress() {
    if (this.animate) {
      clearInterval(this.animate);
    }

    this.progressValue = 0;
    /**
     * progressCurentValue - довільне значення стану прогрес бару
     */
    const progressCurentValue = (10 + Math.round(Math.random() * 90));
    /**
     * anumationSpeed - параметр швидкості анімації (крок в 1% за Х/1000 секунд)
     */
    const anumationSpeed = 50;

    this.animate = setInterval(() => {
      if (this.progressValue < progressCurentValue) {
        this.progressValue += 1;
      } else {
        clearInterval(this.animate);
      }
    }, anumationSpeed );
  }
}
