import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MyQuarantinePage } from './my-quarantine.page';

describe('MyQuarantinePage', () => {
  let component: MyQuarantinePage;
  let fixture: ComponentFixture<MyQuarantinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyQuarantinePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MyQuarantinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
