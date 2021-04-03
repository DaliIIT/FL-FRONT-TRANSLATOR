import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CallModalPage } from './call-modal.page';

describe('CallModalPage', () => {
  let component: CallModalPage;
  let fixture: ComponentFixture<CallModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CallModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
