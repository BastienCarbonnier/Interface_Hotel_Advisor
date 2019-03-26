import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmetteurComponent } from './emetteur.component';

describe('EmetteurComponent', () => {
  let component: EmetteurComponent;
  let fixture: ComponentFixture<EmetteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmetteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmetteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
