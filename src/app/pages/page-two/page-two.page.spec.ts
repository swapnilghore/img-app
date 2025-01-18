import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTwoPage } from './page-two.page';

describe('PageTwoPage', () => {
  let component: PageTwoPage;
  let fixture: ComponentFixture<PageTwoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
