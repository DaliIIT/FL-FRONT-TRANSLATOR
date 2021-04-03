import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentlistPage } from './paymentlist.page';

describe('PaymentlistPage', () => {
  let component: PaymentlistPage;
  let fixture: ComponentFixture<PaymentlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
