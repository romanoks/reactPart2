const initialState = {
  message:[
  ],
  searchTerm: ''
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { message: action.payload };
    case 'CLEAR_ALL':
      return initialState;
    default:
      return state;
  }
}
