import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonContent, IonicModule} from '@ionic/angular';
import {ContactsTabComponent} from './contacts-tab.component';

describe('MasterContactsTabComponent', () => {
    let component: ContactsTabComponent;
    let fixture: ComponentFixture<ContactsTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                IonicModule
            ],
            declarations: [
                IonContent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ContactsTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('should be some tests');
});
