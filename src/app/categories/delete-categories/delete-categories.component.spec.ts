import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategoriesComponent } from './delete-categories.component';

describe('DeleteCategoriesComponent', () => {
  let component: DeleteCategoriesComponent;
  let fixture: ComponentFixture<DeleteCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
