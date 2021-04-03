import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientInfoPage } from './patient-info.page';

describe('PatientInfoPage', () => {
  let component: PatientInfoPage;
  let fixture: ComponentFixture<PatientInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
