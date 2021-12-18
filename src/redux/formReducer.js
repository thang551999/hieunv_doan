const initialState = { reload: 0 };
export default function (state = initialState, action) {
  switch (action.type) {
    case "DeleteFormAction": {
      return {
        ...state,
        reload: action.payload,
      };
    }

    default:
      return state;
  }
}
