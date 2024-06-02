import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabaBohdanComponent } from './raba-bohdan.component';

describe('RabaBohdanComponent', () => {
  let component: RabaBohdanComponent;
  let fixture: ComponentFixture<RabaBohdanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RabaBohdanComponent]
    });
    fixture = TestBed.createComponent(RabaBohdanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
