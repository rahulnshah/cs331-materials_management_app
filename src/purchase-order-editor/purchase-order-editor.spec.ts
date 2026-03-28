import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderEditor } from './purchase-order-editor';

describe('PurchaseOrderEditor', () => {
  let component: PurchaseOrderEditor;
  let fixture: ComponentFixture<PurchaseOrderEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
