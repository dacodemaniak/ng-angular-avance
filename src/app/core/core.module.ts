import { fakeBackendProvider } from './services/fake-backend.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    fakeBackendProvider
  ]
})
export class CoreModule {
  public constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('Le module Core est déjà chargé !');
    }
  }
}
