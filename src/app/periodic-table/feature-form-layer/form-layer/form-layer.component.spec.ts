import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLayerComponent } from './form-layer.component';

describe('FormLayerComponent', () => {
  let component: FormLayerComponent;
  let fixture: ComponentFixture<FormLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
