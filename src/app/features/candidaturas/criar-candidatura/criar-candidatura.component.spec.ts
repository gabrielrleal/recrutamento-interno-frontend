import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCandidaturaComponent } from './criar-candidatura.component';

describe('CriarCandidaturaComponent', () => {
  let component: CriarCandidaturaComponent;
  let fixture: ComponentFixture<CriarCandidaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarCandidaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarCandidaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
