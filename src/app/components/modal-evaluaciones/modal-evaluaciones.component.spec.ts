import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEvaluacionesComponent } from './modal-evaluaciones.component';

describe('ModalEvaluacionesComponent', () => {
  let component: ModalEvaluacionesComponent;
  let fixture: ComponentFixture<ModalEvaluacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEvaluacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEvaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
