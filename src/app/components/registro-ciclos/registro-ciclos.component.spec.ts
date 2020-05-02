import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCiclosComponent } from './registro-ciclos.component';

describe('RegistroCiclosComponent', () => {
  let component: RegistroCiclosComponent;
  let fixture: ComponentFixture<RegistroCiclosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCiclosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCiclosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
