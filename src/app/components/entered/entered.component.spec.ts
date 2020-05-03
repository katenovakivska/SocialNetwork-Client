import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteredComponent } from './entered.component';

describe('EnteredComponent', () => {
  let component: EnteredComponent;
  let fixture: ComponentFixture<EnteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
