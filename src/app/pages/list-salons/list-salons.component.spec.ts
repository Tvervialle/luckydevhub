import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalonsComponent } from './list-salons.component';

describe('ListSalonsComponent', () => {
  let component: ListSalonsComponent;
  let fixture: ComponentFixture<ListSalonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSalonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSalonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
