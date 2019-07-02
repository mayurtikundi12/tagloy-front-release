import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealCardComponent } from './reveal-card.component';

describe('RevealCardComponent', () => {
  let component: RevealCardComponent;
  let fixture: ComponentFixture<RevealCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevealCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
