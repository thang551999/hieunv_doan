const initialState = { token: "", mtime: "", groups: [], tenant: 1 };
export default function (state = initialState, action) {
  switch (action.type) {
    case "Login": {
      return {
        token: action.payload.token,
        mtime: new Date().getTime(),
        groups: action.payload.groups,
        tenant: action.payload.tenant,
      };
    }
    case "logout": {
      console.log("action set", action.payload);
      let x = JSON.parse(JSON.stringify(state));
      x.push(action.payload);
      return [...action.payload];
    }

    default:
      return state;
  }
}
