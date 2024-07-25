import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCandidaturasComponent } from './listar-candidaturas.component';

describe('ListarCandidaturasComponent', () => {
  let component: ListarCandidaturasComponent;
  let fixture: ComponentFixture<ListarCandidaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCandidaturasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCandidaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
