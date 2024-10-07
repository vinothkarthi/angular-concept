import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableSubjectComponent } from './observable-subject.component';

describe('ObservableSubjectComponent', () => {
  let component: ObservableSubjectComponent;
  let fixture: ComponentFixture<ObservableSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ObservableSubjectComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(ObservableSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
