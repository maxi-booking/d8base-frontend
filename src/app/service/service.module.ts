import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationPageModule } from '@app/auth/pages/registration/registration.module';
import { PricesApiService } from '@app/core/services/prices-api.service';
import { ServiceLocationApiService } from '@app/core/services/service-location-api.service';
import { ServicePhotoApiService } from '@app/core/services/service-photo-api.service';
import { ServiceTagsApiService } from '@app/core/services/service-tags-api.service';
import { DepartureComponent } from '@app/service/components/departure/departure.component';
import { MasterPickerPopoverComponent } from '@app/service/components/master-picker/master-picker-popover.component';
import {
  ServiceEditorPageComponent,
  ServiceInfoEditorComponent,
  ServiceLocationEditorComponent,
  ServiceScheduleEditComponent,
  ServiceTypeEditComponent,
  ServiceDetailsEditComponent,
} from '@app/service/components/service-editor-page';
import { ServiceEditorDepsService } from '@app/service/components/service-editor-page/service-editor-deps.service';
import { ServicePublishFinalStepComponent } from '@app/service/components/service-publish-final-step/service-publish-final-step.component';
import { ServicePublishStepFiveComponent } from '@app/service/components/service-publish-step-five/service-publish-step-five.component';
import { ServicePublishStepFourComponent } from '@app/service/components/service-publish-step-four/service-publish-step-four.component';
import { ServicePublishStepOneComponent } from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import { ServicePublishStepSevenComponent } from '@app/service/components/service-publish-step-seven/service-publish-step-seven.component';
import { ServicePublishStepSixComponent } from '@app/service/components/service-publish-step-six/service-publish-step-six.component';
import { ServicePublishStepThreeComponent } from '@app/service/components/service-publish-step-three/service-publish-step-three.component';
import { ServicePublishStepTwoComponent } from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
import { ServicePublishWrapperComponent } from '@app/service/components/service-publish-wrapper/service-publish-wrapper.component';
import { ServiceViewerPageComponent } from '@app/service/components/service-viewer-page/service-viewer-page.component';
import { TimetableComponent } from '@app/service/components/timetable/timetable.component';
import { ServicePublishStepFiveFormService } from '@app/service/forms/service-publish-step-five-form.service';
import { ServicePublishStepSevenDepartureFormService } from '@app/service/forms/service-publish-step-seven-departure-form.service';
import { ServicePublishStepSevenFormService } from '@app/service/forms/service-publish-step-seven-form.service';
import { ServicePublishStepSixFormService } from '@app/service/forms/service-publish-step-six-form.service';
import { ServicePublishGuardService } from '@app/service/guards/service-publish-guard.service';
import { ServicePublishAuthStateManagerService } from '@app/service/services/service-publish-auth-state-manager.service';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServicePublishDataPreparerService } from '@app/service/services/service-publish-data-preparer.service';
import { ServicePublishService } from '@app/service/services/service-publish.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import { ChainManagerService } from '@app/service/services/steps-navigation-chain/chain-manager.service';
import { StepFinalHandlerService } from '@app/service/services/steps-navigation-chain/step-final-handler.service';
import { StepFiveHandlerService } from '@app/service/services/steps-navigation-chain/step-five-handler.service';
import { StepFourHandlerService } from '@app/service/services/steps-navigation-chain/step-four-handler.service';
import { StepOneHandlerService } from '@app/service/services/steps-navigation-chain/step-one-handler.service';
import { StepSevenHandlerService } from '@app/service/services/steps-navigation-chain/step-seven-handler.service';
import { StepSixHandlerService } from '@app/service/services/steps-navigation-chain/step-six-handler.service';
import { StepThreeHandlerService } from '@app/service/services/steps-navigation-chain/step-three-handler.service';
import { StepTwoHandlerService } from '@app/service/services/steps-navigation-chain/step-two-handler.service';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BrMaskerModule } from 'br-mask';
import { IonicSelectableModule } from 'ionic-selectable';
import { ServicePublishResetStateService } from './guards/service-publish-reset-state.service';
import { ServicePageRoutingModule } from './service-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicePageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicSelectableModule,
    BrMaskerModule,
    RegistrationPageModule,
  ],
  declarations: [
    ServicePublishStepOneComponent,
    ServicePublishStepTwoComponent,
    ServicePublishStepThreeComponent,
    ServicePublishStepFourComponent,
    ServicePublishStepFiveComponent,
    ServicePublishStepSixComponent,
    ServicePublishStepSevenComponent,
    TimetableComponent,
    DepartureComponent,
    ServicePublishFinalStepComponent,
    MasterPickerPopoverComponent,
    ServiceViewerPageComponent,
    ServiceEditorPageComponent,
    ServiceInfoEditorComponent,
    ServiceTypeEditComponent,
    ServiceScheduleEditComponent,
    ServiceLocationEditorComponent,
    ServicePublishWrapperComponent,
    ServiceDetailsEditComponent,
  ],
  providers: [
    PricesApiService,
    ServiceTagsApiService,
    ServiceLocationApiService,
    ServicePhotoApiService,
    ServicePublishDataHolderService,
    ServicePublishStepFiveFormService,
    ServicePublishStepSixFormService,
    ServicePublishStepSevenFormService,
    ServicePublishStepSevenDepartureFormService,
    ServiceStepsNavigationService,
    ServicePublishService,
    ServicePublishDataPreparerService,
    ChainManagerService,
    StepOneHandlerService,
    StepTwoHandlerService,
    StepThreeHandlerService,
    StepFourHandlerService,
    StepFiveHandlerService,
    StepSixHandlerService,
    StepSevenHandlerService,
    StepFinalHandlerService,
    ServicePublishAuthStateManagerService,
    ServicePublishGuardService,
    ServiceEditorDepsService,
    ServicePublishResetStateService,
  ],
})
export class ServicePageModule {}
