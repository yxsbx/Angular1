import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDataPickerComponent } from './header-data-picker.component';

describe('HeaderDataPickerComponent', () => {
  let component: HeaderDataPickerComponent;
  let fixture: ComponentFixture<HeaderDataPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDataPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderDataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
