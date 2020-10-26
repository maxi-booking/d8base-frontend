import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {DurationComponent} from './duration.component';

describe('DurationComponent', () => {
    let component: DurationComponent;
    let fixture: ComponentFixture<DurationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DurationComponent],
            imports: [
                IonicModule.forRoot(),
                ReactiveFormsModule,
                FormsModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DurationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('convert minutes to duration in dd:hh:mm', () => {
        component.writeValue(1563); // 1563 minutes = 1 day, 2 hour, 3 minute
        expect(component.form.controls.days.value).toEqual(1);
        expect(component.form.controls.hours.value).toEqual(2);
        expect(component.form.controls.minutes.value).toEqual(3);
    });

    it('convert duration in dd:hh:mm to minutes', () => {
        component.form.controls.days.setValue(1);
        component.form.controls.hours.setValue(2);
        component.registerOnChange((v) => expect(v).toEqual(1563));
        component.form.controls.minutes.setValue(3);
    });
});