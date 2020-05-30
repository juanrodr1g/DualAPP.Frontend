import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalAPComponentEditarEmpresa } from './form-modal-ap.component';

describe('FormModalAPComponent', () => {
  let component: FormModalAPComponentEditarEmpresa;
  let fixture: ComponentFixture<FormModalAPComponentEditarEmpresa>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModalAPComponentEditarEmpresa ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalAPComponentEditarEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
