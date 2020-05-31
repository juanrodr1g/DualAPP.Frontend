import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalAPComponentCambioContraseña } from './form-modal-ap.component';

describe('FormModalAPComponent', () => {
  let component: FormModalAPComponentCambioContraseña;
  let fixture: ComponentFixture<FormModalAPComponentCambioContraseña>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModalAPComponentCambioContraseña ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalAPComponentCambioContraseña);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
