import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeItemListComponent } from './home-item-list.component';

describe('HomeItemListComponent', () => {
  let component: HomeItemListComponent;
  let fixture: ComponentFixture<HomeItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
