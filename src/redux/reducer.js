import login from './loginReducer';
import formReducer from './formReducer';

import {combineReducers} from 'redux';

export default combineReducers({
  login,
  formReducer
});