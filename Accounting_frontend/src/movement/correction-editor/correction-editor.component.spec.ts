import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionEditorComponent } from './correction-editor.component';

describe('CorrectionEditorComponent', () => {
  let component: CorrectionEditorComponent;
  let fixture: ComponentFixture<CorrectionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectionEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrectionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
