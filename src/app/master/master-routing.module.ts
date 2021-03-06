import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from '@app/core/guards/main.guard';
import { ProfessionalResolver } from '@app/master/professional.resolver';
import { ProfessionalContactEditComponent } from './components/professional-contact-edit/professional-contact-edit.component';

import { MasterPage } from './master.page';
import { ProfessionalGuard } from './professional.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [ProfessionalGuard],
  },
  {
    path: ':master-id',
    pathMatch: 'full',
    component: MasterPage,
    resolve: {
      context: ProfessionalResolver,
    },
  },
  {
    path: ':master-id',
    resolve: {
      context: ProfessionalResolver,
    },
    children: [
      {
        path: '',
        component: MasterPage,
        pathMatch: 'full',
      },
      {
        path: 'add',
        loadChildren: () => import('./pages/master-edit/master-edit.module').then(m => m.MasterEditPageModule),
        pathMatch: 'full',
      },
      {
        path: 'edit/:master-id',
        loadChildren: () => import('./pages/master-edit/master-edit.module').then(m => m.MasterEditPageModule),
        pathMatch: 'full',
      },
      {
        path: 'location-add',
        loadChildren: () =>
          import('./pages/master-location-edit/master-location-edit.module').then(m => m.MasterLocationEditPageModule),
        pathMatch: 'full',
      },
      {
        path: 'location-edit/:location-id',
        loadChildren: () =>
          import('./pages/master-location-edit/master-location-edit.module').then(m => m.MasterLocationEditPageModule),
        pathMatch: 'full',
      },
      {
        path: 'experience-edit/:experience-id',
        loadChildren: () =>
          import('./pages/master-experience-edit/master-experience-edit.module').then(
            m => m.MasterExperienceEditPageModule,
          ),
        pathMatch: 'full',
      },
      {
        path: 'experience-add',
        loadChildren: () =>
          import('./pages/master-experience-edit/master-experience-edit.module').then(
            m => m.MasterExperienceEditPageModule,
          ),
        pathMatch: 'full',
      },
      {
        path: 'education-add',
        loadChildren: () =>
          import('./pages/master-education-edit/master-education-edit.module').then(
            m => m.MasterEducationEditPageModule,
          ),
        pathMatch: 'full',
      },
      {
        path: 'education-edit/:education-id',
        loadChildren: () =>
          import('./pages/master-education-edit/master-education-edit.module').then(
            m => m.MasterEducationEditPageModule,
          ),
        pathMatch: 'full',
      },
      {
        path: 'certificate-add',
        loadChildren: () =>
          import('./pages/master-certificate-edit/master-certificate-edit.module').then(
            m => m.MasterCertificateEditPageModule,
          ),
        pathMatch: 'full',
      },
      {
        path: 'certificate-edit/:certificate-id',
        loadChildren: () =>
          import('./pages/master-certificate-edit/master-certificate-edit.module').then(
            m => m.MasterCertificateEditPageModule,
          ),
        pathMatch: 'full',
      },
      {
        path: 'tags-edit',
        loadChildren: () =>
          import('./pages/master-tag-edit/master-tag-edit.module').then(m => m.MasterTagEditPageModule),
        pathMatch: 'full',
      },
      {
        path: 'professional-contact-add-default/:default-contact-id',
        component: ProfessionalContactEditComponent,
        canActivate: [MainGuard],
      },
      {
        path: 'professional-contact-edit/:contact-id',
        component: ProfessionalContactEditComponent,
        canActivate: [MainGuard],
      },
      {
        path: 'professional-contact-add',
        component: ProfessionalContactEditComponent,
        canActivate: [MainGuard],
      },
      {
        path: 'master-edit',
        loadChildren: () => import('./pages/master-edit/master-edit.module').then(m => m.MasterEditPageModule),
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterPageRoutingModule {}
