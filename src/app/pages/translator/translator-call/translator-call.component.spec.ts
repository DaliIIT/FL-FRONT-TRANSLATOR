import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranslatorCallComponent } from './translator-call.component';

describe('TranslatorCallComponent', () => {
  let component: TranslatorCallComponent;
  let fixture: ComponentFixture<TranslatorCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatorCallComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TranslatorCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
