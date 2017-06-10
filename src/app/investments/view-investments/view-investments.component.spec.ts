import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvestmentsComponent } from './view-investments.component';

xdescribe('ViewInvestmentsComponent', () => {
  let component: ViewInvestmentsComponent;
  let fixture: ComponentFixture<ViewInvestmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInvestmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
