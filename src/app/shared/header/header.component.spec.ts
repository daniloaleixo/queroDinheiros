import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';


class MockRouter {
  public ne = new NavigationEnd(0, 'http://localhost:4200/', 'http://localhost:4200/');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
}


xdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [{ provide: Router, useClass: MockRouter }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});


