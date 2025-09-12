import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiProviderResolverComponent } from './di-provider-resolver.component';

describe('DiProviderResolverComponent', () => {
  let component: DiProviderResolverComponent;
  let fixture: ComponentFixture<DiProviderResolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiProviderResolverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiProviderResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
