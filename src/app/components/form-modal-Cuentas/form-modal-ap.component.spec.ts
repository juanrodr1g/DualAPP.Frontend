import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalAPComponentUsuario } from './form-modal-ap.component';

describe('FormModalAPComponent', () => {
  let component: FormModalAPComponentUsuario;
  let fixture: ComponentFixture<FormModalAPComponentUsuario>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModalAPComponentUsuario ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalAPComponentUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
