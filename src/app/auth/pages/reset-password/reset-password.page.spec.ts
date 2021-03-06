import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorFlashbagComponent } from '@app/shared/components/error-flashbag/error-flashbag.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ResetPasswordApiService } from '../../services/reset-password-api.service';
import { ResetPasswordPage } from './reset-password.page';

describe('ResetPasswordPage', () => {
  let component: ResetPasswordPage;
  let fixture: ComponentFixture<ResetPasswordPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ResetPasswordPage, ErrorFlashbagComponent],
        imports: [
          IonicModule,
          ReactiveFormsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          TranslateModule.forRoot(),
        ],
        providers: [ResetPasswordApiService],
      }).compileComponents();

      fixture = TestBed.createComponent(ResetPasswordPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
