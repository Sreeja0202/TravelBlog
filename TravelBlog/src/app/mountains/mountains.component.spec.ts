import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainsComponent } from './mountains.component';

describe('MountainsComponent', () => {
  let component: MountainsComponent;
  let fixture: ComponentFixture<MountainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MountainsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MountainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
