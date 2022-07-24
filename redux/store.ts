import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AttorneyPageSlice from '@views/containers/Attorneys/AttorneyPageSlice';
import HomePageSliceReducer from '@views/containers/HomePage/homePageSlice';
import ReferenceReducer from '@views/containers/Reference/ReferenceSlice';
import ReduxLogger from "redux-logger"

const middleware = (getDefaultMiddleWare: any) => {
  /* if (process.env.NODE_ENV === 'development') {
    return getDefaultMiddleWare().concat(ReduxLogger);
  } */
  return getDefaultMiddleWare();
}

export const store = configureStore({
  middleware,
  reducer: {
    homePage: HomePageSliceReducer,
    attorneyPage: AttorneyPageSlice,
    reference: ReferenceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
