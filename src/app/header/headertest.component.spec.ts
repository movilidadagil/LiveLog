import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadertestComponent } from './headertest.component';

describe('HeadertestComponent', () => {
  let component: HeadertestComponent;
  let fixture: ComponentFixture<HeadertestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadertestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadertestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
