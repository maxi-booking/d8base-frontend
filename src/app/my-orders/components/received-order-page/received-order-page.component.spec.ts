import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReceiverOrderStatusController } from '@app/my-orders/services';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ReceivedOrderPageComponent } from './received-order-page.component';

describe('ReceivedOrderPageComponent', () => {
  let component: ReceivedOrderPageComponent;
  let fixture: ComponentFixture<ReceivedOrderPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReceivedOrderPageComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [ReceiverOrderStatusController],
      }).compileComponents();

      fixture = TestBed.createComponent(ReceivedOrderPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
