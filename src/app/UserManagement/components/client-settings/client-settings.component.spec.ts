import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSettingsComponent } from './client-settings.component';

describe('ClientSettingsComponent', () => {
  let component: ClientSettingsComponent;
  let fixture: ComponentFixture<ClientSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSettingsComponent]
    });
    fixture = TestBed.createComponent(ClientSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
