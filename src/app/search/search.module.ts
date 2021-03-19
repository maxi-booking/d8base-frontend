import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from '@app/infinite-scroll/infinite-scroll.module';
import { ReviewsModule } from '@app/reviews/reviews.module';
import {
  SearchFiltersAdditionalTabComponent,
 } from '@app/search/components/search-filters-additional-tab/search-filters-additional-tab.component';
import { SearchFiltersMainTabComponent } from '@app/search/components/search-filters-main-tab/search-filters-main-tab.component';
import { SearchFiltersSubmenuComponent } from '@app/search/components/search-filters-submenu/search-filters-submenu.component';
import { SearchFiltersComponent } from '@app/search/components/search-filters/search-filters.component';
import { SearchResultComponent } from '@app/search/components/search-result/search-result.component';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { FiltersPage } from './pages/filters/filters.page';
import { SearchPage } from './search-page.component';
import { SearchPageRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    TranslateModule,
    SharedModule,
    IonicSelectableModule,
    ReviewsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  declarations: [
    SearchPage,
    SearchFiltersComponent,
    SearchFiltersSubmenuComponent,
    SearchFiltersMainTabComponent,
    SearchFiltersAdditionalTabComponent,
    SearchResultComponent,
    FiltersPage,
  ],
  exports: [SearchFiltersComponent],
  providers: [SearchFilterStateService],
})
export class SearchPageModule {}
