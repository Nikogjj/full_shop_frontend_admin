import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowCategorieComponent } from './row-categorie.component';

describe('RowCategorieComponent', () => {
  let component: RowCategorieComponent;
  let fixture: ComponentFixture<RowCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowCategorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
