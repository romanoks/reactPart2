import keyMirror from 'keymirror';
import axios from 'axios';
import { browserHistory } from 'react-router';
import {Path} from 'Root';
import {toastr} from 'react-redux-toastr';

export const messageActionType = keyMirror(
  {
    SET_MESSAGE: null,
    CLEAR_ALL: null
  });

export function createMessage(values) {
  console.log('create');
  // return dispatch => {
  //   return axios.post(url, data)
  //     .then(() => {
  //       browserHistory.goBack();
  //     });
}

const config = {
    headers: {'Authorization':'Basic ZGVtbzo2SFZHak9uSm1qM253'}
  };

export function updateMessage(values) {
  console.log('update');
  const url = '/api/v2/message/testCustomer/persistent';
  return dispatch => {
    return axios.put(url, values,config)
      .then(() => {
        toastr.success('Data update/create');
        browserHistory.push('/');
      })
      .catch((error)=>{
        toastr.error('Error! Data does not update/create');
      });
    }
  }

export function getAll(languages, platforms) {
  const url = '/api/v2/message/testCustomer/push';
  let params = '';
  if(languages!=''){
    params = '?languages='+languages;
  } else if (params!='' && platforms!= ''){
    params = params+'&platforms='+platforms;
  } else if (params==='' && platforms!=''){
    params = '?platforms='+platforms;
  }
  console.log(languages);
  return dispatch => {
    return axios.get('/api/v2/message/testCustomer/persistent'+params,config)
    .then((result) => {
      console.log('Get all');
      dispatch(setDispatch(result.data));
    }).
    catch((error)=>toastr.error('Servre does not send information!'))
    }
}

export function deleteMessage(language, platformInd) {
  console.log('delete ' + language+'--'+platformInd);
  let params = '?language='+language+'&platform='+platformInd;
  let url = '/api/v2/message/testCustomer/persistent'+params;
  return dispatch => {
    return axios.delete(url,config)
      .then(() => {
        toastr.success('Data delete!');
        browserHistory.push('/');
      })
      .catch((error)=>{
        toastr.error('Server error!!!');
      });
  }
}

function setDispatch(data) {
  return {
    type: messageActionType.SET_MESSAGE,
    payload: data
  }
}

export function clearListState() {
  return {
    type: messageActionType.CLEAR_All,
  };
}
