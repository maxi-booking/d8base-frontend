import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, ROOT_MODULES } from 'src/testing/component-testing.module';
import { ServicePublishStepOneFormService } from '../../forms/service-publish-step-one-form.service';
import { ServicePublishDataHolderService } from '../../services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '../../services/service-steps-navigation.service';
import { ChainManagerService } from '../../services/steps-navigation-chain/chain-manager.service';
import { StepFinalHandlerService } from '../../services/steps-navigation-chain/step-final-handler.service';
import { StepFiveHandlerService } from '../../services/steps-navigation-chain/step-five-handler.service';
import { StepFourHandlerService } from '../../services/steps-navigation-chain/step-four-handler.service';
import { StepOneHandlerService } from '../../services/steps-navigation-chain/step-one-handler.service';
import { StepSevenHandlerService } from '../../services/steps-navigation-chain/step-seven-handler.service';
import { StepSixHandlerService } from '../../services/steps-navigation-chain/step-six-handler.service';
import { StepThreeHandlerService } from '../../services/steps-navigation-chain/step-three-handler.service';
import { StepTwoHandlerService } from '../../services/steps-navigation-chain/step-two-handler.service';
import { ServicePublishStepOneComponent } from './service-publish-step-one.component';

describe('ServicePublishStepOneComponent', () => {
  let component: ServicePublishStepOneComponent;
  let fixture: ComponentFixture<ServicePublishStepOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServicePublishStepOneComponent],
      imports: [
        ...ROOT_MODULES,
        ComponentTestingModule,
      ],
      providers: [
        ServicePublishStepOneFormService,
        ServicePublishDataHolderService,
        ServiceStepsNavigationService,
        ChainManagerService,
        StepOneHandlerService,
        StepTwoHandlerService,
        StepThreeHandlerService,
        StepFourHandlerService,
        StepFiveHandlerService,
        StepSixHandlerService,
        StepSevenHandlerService,
        StepFinalHandlerService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicePublishStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
