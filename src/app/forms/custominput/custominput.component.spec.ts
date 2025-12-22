import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustominputComponent } from './custominput.component';

describe('CustominputComponent', () => {
  let component: CustominputComponent;
  let fixture: ComponentFixture<CustominputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustominputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustominputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
