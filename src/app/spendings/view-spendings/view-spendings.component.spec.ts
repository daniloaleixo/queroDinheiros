import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpendingsComponent } from './view-spendings.component';

xdescribe('ViewSpendingsComponent', () => {
  let component: ViewSpendingsComponent;
  let fixture: ComponentFixture<ViewSpendingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSpendingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
