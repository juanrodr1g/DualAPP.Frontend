import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroCiclosComponent } from './modal-registro-ciclos.component';

describe('ModalRegistroCiclosComponent', () => {
  let component: ModalRegistroCiclosComponent;
  let fixture: ComponentFixture<ModalRegistroCiclosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistroCiclosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroCiclosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
