import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import message from './messageReducer';

export default
combineReducers(
  {
    message,
    form,
    toastr: toastrReducer,
  })
