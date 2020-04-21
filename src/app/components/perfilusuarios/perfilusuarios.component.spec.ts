import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilusuariosComponent } from './perfilusuarios.component';

describe('PerfilusuariosComponent', () => {
  let component: PerfilusuariosComponent;
  let fixture: ComponentFixture<PerfilusuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilusuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
