import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserorderformComponent } from './userorderform.component';

describe('UserorderformComponent', () => {
  let component: UserorderformComponent;
  let fixture: ComponentFixture<UserorderformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserorderformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserorderformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
