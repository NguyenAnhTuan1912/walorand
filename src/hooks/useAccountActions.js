import { useDispatch } from "react-redux";

export function useAccountActions() {
  const dispatch = useDispatch();

  return {
    resetAccount() {
      dispatch({
        type: "account::remove_self",
      });
    },

    updateIsConnect(status) {
      dispatch({
        type: "account::set_isconnected",
        payload: status,
      });
    },

    updateAddress(address) {
      dispatch({
        type: "account::set_address",
        payload: address,
      });
    },

    updateBalance(balance) {
      dispatch({
        type: "account::set_balance",
        payload: balance,
      });
    },

    updateAccountDetails(details) {
      dispatch({
        type: "account::set_details",
        payload: details,
      });
    },
  };
}
