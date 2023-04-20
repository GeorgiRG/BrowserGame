import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponentnent } from './registration.component';

describe('RegistrationComponentnent', () => {
  let component: RegistrationComponentnent;
  let fixture: ComponentFixture<RegistrationComponentnent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponentnent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponentnent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
