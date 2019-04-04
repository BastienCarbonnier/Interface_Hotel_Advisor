import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanciationComponent } from './instanciation.component';

describe('InstanciationComponent', () => {
  let component: InstanciationComponent;
  let fixture: ComponentFixture<InstanciationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanciationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
