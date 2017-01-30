function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }
  return false;
}

export default function createThunkMiddleware(exceptionHandler) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      const result = action(dispatch, getState);
      if (isPromise(result) && exceptionHandler) {
        console.log(exceptionHandler);
        return result.catch(exceptionHandler(dispatch));
      }
      return result;
    }
    return next(action);
  };
}
