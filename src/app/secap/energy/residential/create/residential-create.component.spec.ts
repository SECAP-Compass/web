import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialCreateComponent } from './residential-create.component';

describe('ResidentialCreateComponent', () => {
  let component: ResidentialCreateComponent;
  let fixture: ComponentFixture<ResidentialCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentialCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidentialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
