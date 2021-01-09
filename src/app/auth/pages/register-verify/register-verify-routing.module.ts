import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterVerifyPage } from './register-verify.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterVerifyPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterVerifyPageRoutingModule {
}
