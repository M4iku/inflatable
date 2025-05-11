import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientItemListComponent } from './client-item-list.component';

describe('ClientItemListComponent', () => {
  let component: ClientItemListComponent;
  let fixture: ComponentFixture<ClientItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
