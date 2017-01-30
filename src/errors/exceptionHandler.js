import { SubmissionError } from 'redux-form';
import _ from 'lodash';
import {toastr} from 'react-redux-toastr';

function showUnhandledError() {
  toastr.error('Error! Data do not save on server');
}

export default function exceptionHandler(dispatch) {
  return (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          dispatch();
          break;
        default:
          showUnhandledError();
      }
    } else {
      throw error;
    }
  };
}
