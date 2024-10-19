function _createAccount(isClean) {
  if (isClean) return null;

  return {
    balance: 0,
    address: null,
  };
}

function getInitialState(isClean) {
  return _createAccount(isClean);
}

function accountReducer(state = getInitialState(false), action) {
  if (action.type === "account::save") {
    const tmpState = { ...state, ...action.payload };
    return tmpState;
  }

  if (action.type === "account::store_balance") {
    const tmpState = { ...state };
    tmpState.balance = action.payload;
    return tmpState;
  }

  if (action.type === "account::remove_self") {
    return getInitialState(true);
  }

  if (action.type === "account::set_address") {
    const tmpState = { ...state };
    tmpState.address = action.payload;
    return tmpState;
  }

  return state;
}

export default accountReducer;
