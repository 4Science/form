import {
  Action,
  Store,
} from '@ngrx/store';

import {
  AbstractStore,
  FormStore,
} from './form-store';

/// Use this function in your providers list if you are not using @angular-redux/core.
/// This will allow you to provide a preexisting store that you have already
/// configured, rather than letting @angular-redux/core create one for you.
export const provideReduxForms = <T>(store: Store<T> | any) => {
  const abstractStore = wrap(store);

  return [
    {provide: FormStore, useValue: new FormStore(<any> abstractStore)}
  ];
};

const wrap = <T>(store: Store<T> | any): AbstractStore<T> => {
  const dispatch = (action: Action) => store.dispatch(action);

  const getState = () => {
      let state: any;
      store.take(1).subscribe((s: any) => state = s);
      return state;
  };

  const subscribe =
    (fn: (state: T) => void) => store.subscribe(() => fn(store.getState()));

  return {dispatch, getState, subscribe};
};
