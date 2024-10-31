import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAuctionComponent } from './create-new-auction.component';

describe('CreateNewAuctionComponent', () => {
  let component: CreateNewAuctionComponent;
  let fixture: ComponentFixture<CreateNewAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewAuctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
