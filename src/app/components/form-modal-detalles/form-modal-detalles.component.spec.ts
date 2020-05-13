import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalDetallesComponent } from './form-modal-detalles.component';

describe('FormModalDetallesComponent', () => {
  let component: FormModalDetallesComponent;
  let fixture: ComponentFixture<FormModalDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModalDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
