// Import utils
import BrowserStorageUtils from "../utils/browser_storage";

function _createAccount(isClean) {
  if (isClean) {
    BrowserStorageUtils.removeItem("axd");
  }

  return {
    address: BrowserStorageUtils.getItem("axd") || null,
    details: null,
    isConnected: Boolean(BrowserStorageUtils.getItem("axd")),
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

  if (action.type === "account::remove_self") {
    return getInitialState(true);
  }

  if (action.type === "account::set_address") {
    const tmpState = { ...state };
    tmpState.address = action.payload;

    if (action.payload) {
      BrowserStorageUtils.setItem("axd", action.payload);
    }

    return tmpState;
  }

  if (action.type === "account::set_isconnected") {
    const tmpState = { ...state };
    tmpState.isConnected = Boolean(action.payload);
    if (action.payload) {
      tmpState.address = BrowserStorageUtils.getItem("axd");
    } else {
      tmpState.address = null;
    }
    return tmpState;
  }

  if (action.type === "account::set_details") {
    const tmpState = { ...state };

    // Get balance in details for now
    tmpState.details = {
      balance: action.payload.amount,
    };

    return tmpState;
  }

  return state;
}

export default accountReducer;
