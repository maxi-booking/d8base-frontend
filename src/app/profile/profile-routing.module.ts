import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainInfoTabComponent} from '@app/profile/components/main-info-tab/main-info-tab.component';
import {PluginsTabComponent} from '@app/profile/components/plugins-tab/plugins-tab.component';
import {ProfilePage} from './profile.page';
import {ContactTabComponent} from '@app/profile/components/contact-tab/contact-tab.component';
import {EducationTabComponent} from '@app/profile/components/education-tab/education-tab.component';
import {MasterGuard} from '@app/core/guards/master.guard';

const routes: Routes = [
    {
        path: 'tabs',
        component: ProfilePage,
        data: {
            title: 'Profile'
        },
        children: [
            {
                path: 'main',
                component: MainInfoTabComponent
            },
            {
                path: 'plugins',
                component: PluginsTabComponent
            },
            {
                path: 'contacts',
                component: ContactTabComponent
            },
            {
                path: 'education',
                component: EducationTabComponent,
                canActivate: [MasterGuard]
            }
        ]
    },
    {
        path: '',
        redirectTo: 'tabs/main',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfilePageRoutingModule {
}
