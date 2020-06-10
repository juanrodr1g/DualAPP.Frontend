import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDiarioComponent } from './form-diario.component';

describe('FormDiarioComponent', () => {
  let component: FormDiarioComponent;
  let fixture: ComponentFixture<FormDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
