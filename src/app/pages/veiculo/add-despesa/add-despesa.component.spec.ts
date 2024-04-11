import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDespesaComponent } from './add-despesa.component';

describe('AddDespesaComponent', () => {
  let component: AddDespesaComponent;
  let fixture: ComponentFixture<AddDespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDespesaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
