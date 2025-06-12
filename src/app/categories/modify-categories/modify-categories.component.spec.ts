import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCategoriesComponent } from './modify-categories.component';

describe('ModifyCategoriesComponent', () => {
  let component: ModifyCategoriesComponent;
  let fixture: ComponentFixture<ModifyCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
