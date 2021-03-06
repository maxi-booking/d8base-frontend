import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterVerifyPageRoutingModule } from './register-verify-routing.module';
import { RegisterVerifyPage } from './register-verify.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, RegisterVerifyPageRoutingModule, TranslateModule],
  declarations: [RegisterVerifyPage],
})
export class RegisterVerifyPageModule {}
