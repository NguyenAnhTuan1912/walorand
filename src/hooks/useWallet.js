import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { PeraWalletConnect } from "@perawallet/connect";
import { PeraOnramp } from "@perawallet/onramp";

// Import components
import { useToast } from "../components/shared/use-toast";

export function useWallet() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const { toast } = useToast();
  const [peraWallet, peraOnRamp] = React.useMemo(
    () => [
      new PeraWalletConnect({ compactMode: true }),
      new PeraOnramp({
        optInEnabled: true,
      }),
    ],
    []
  );

  return {
    account,
    peraWallet,
    peraOnRamp,
    async connect() {
      try {
        const connectedAccount = await peraWallet.connect();
        console.log("New Account:", connectedAccount);
        dispatch({
          action: "account::set_address",
          payload: connectedAccount[0],
        });
      } catch (e) {
        console.log(e);
        toast({
          title: "Error - Connect to Pera Wallet",
          description: e.message,
        });
      }
    },
  };
}
