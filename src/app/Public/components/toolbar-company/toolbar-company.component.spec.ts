import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarCompanyComponent } from './toolbar-company.component';

describe('ToolbarCompanyComponent', () => {
  let component: ToolbarCompanyComponent;
  let fixture: ComponentFixture<ToolbarCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarCompanyComponent]
    });
    fixture = TestBed.createComponent(ToolbarCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
