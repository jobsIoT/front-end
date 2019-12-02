import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { SigninPage } from './tab2.page';

describe('SigninPage', () => {
  let component: SigninPage;
  let fixture: ComponentFixture<SigninPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SigninPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    }).compileComponents();

    fixture = TestBed.createComponent(SigninPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
