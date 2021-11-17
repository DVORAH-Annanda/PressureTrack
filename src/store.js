import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { unitListReducer, unitSensorValuesReducer } from './reducers/unitReducers';
import { userSignInReducer } from './reducers/userReducer';

const initialState = {
  userSignIn: {
    userInfo: null
    //userInfo: localStorage.getItem('userInfo')
    //? JSON.parse(localStorage.getItem('userInfo'))
    //:
    //null
  },
}

const reducer = combineReducers({
    userSignIn: userSignInReducer,
    unitList: unitListReducer,
    unitSensorValues: unitSensorValuesReducer
});

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(thunk))
);

export default store;