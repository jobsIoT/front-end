import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JourneysPage } from './journeys.page';

describe('JourneysPage', () => {
  let component: JourneysPage;
  let fixture: ComponentFixture<JourneysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneysPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JourneysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
