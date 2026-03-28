import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialLotEditor } from './material-lot-editor';

describe('MaterialLotEditor', () => {
  let component: MaterialLotEditor;
  let fixture: ComponentFixture<MaterialLotEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialLotEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialLotEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
