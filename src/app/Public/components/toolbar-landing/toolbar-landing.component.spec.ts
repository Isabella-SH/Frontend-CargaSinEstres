import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarLandingComponent } from './toolbar-landing.component';

describe('ToolbarLandingComponent', () => {
  let component: ToolbarLandingComponent;
  let fixture: ComponentFixture<ToolbarLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarLandingComponent]
    });
    fixture = TestBed.createComponent(ToolbarLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
