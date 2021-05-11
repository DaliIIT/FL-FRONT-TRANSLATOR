import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranslatorTabsComponent } from './translator-tabs.component';

describe('TranslatorTabsComponent', () => {
  let component: TranslatorTabsComponent;
  let fixture: ComponentFixture<TranslatorTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatorTabsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TranslatorTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
