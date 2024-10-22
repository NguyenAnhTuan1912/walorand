import React from "react";

// Import hooks
import { useWallet } from "../hooks/useWallet";
import { useAccountActions } from "../hooks/useAccountActions";

// Import utils
import { getAccountBalanceText, getAccountInformation } from "../utils/account";
import { hideAddress } from "../utils/string";
import { cn } from "../utils/tailwind_merge";

export default function AccountDetails() {
  const { account, peraWallet, connect, disconnect } = useWallet();
  const { updateIsConnect, updateAddress, updateAccountDetails } =
    useAccountActions();

  console.log("Account:", account);

  React.useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", disconnect);

        console.log(accounts);
        if (peraWallet.isConnected && accounts.length) {
          getAccountInformation("testnet", account.address).then((details) => {
            updateAddress(accounts[0]);
            updateIsConnect(true);
            updateAccountDetails(details);
          });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex">
      <div className="text-white text-right me-2">
        <p>Account: {hideAddress(account.address)}</p>
        <p>Balance: {getAccountBalanceText(account.details)}</p>
      </div>
      <button
        onClick={() => connect()}
        className={cn(
          "mx-1 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium",
          "ring-offset-background transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "text-white bg-white/10 border-sm my-1",
          "hover:bg-white/20" // Thêm hiệu ứng hover
        )}
      >
        {account.isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}
