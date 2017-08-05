import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {NgRedux} from '@angular-redux/store';
import { StoreModule, Store } from '@ngrx/store';

import {NgReduxFormConnectModule} from './connect';
import {NgReduxFormConnectArrayModule} from './connect-array';
import {FormStore} from './form-store';

export function formStoreFactory(store: Store<any>) {
  return new FormStore(store);
}

@NgModule({
  imports: [
    StoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxFormConnectModule,
    NgReduxFormConnectArrayModule,
  ],
  exports: [
    NgReduxFormConnectModule,
    NgReduxFormConnectArrayModule
  ],
  providers: [
    {
      provide: FormStore,
      useFactory: formStoreFactory,
      deps: [Store],
    },
  ],
})
export class NgReduxFormModule {}
