import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressAnimationComponent } from './progress-animation.component';

describe('ProgressAnimationComponent', () => {
  let component: ProgressAnimationComponent;
  let fixture: ComponentFixture<ProgressAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
