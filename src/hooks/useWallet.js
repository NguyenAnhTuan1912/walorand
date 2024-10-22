import React from "react";
import { useSelector } from "react-redux";
import { PeraWalletConnect } from "@perawallet/connect";
import { PeraOnramp } from "@perawallet/onramp";
import algosdk from "algosdk";

// Import components
import { useToast } from "../components/shared/use-toast";

// Import hooks
import { useAccountActions } from "./useAccountActions";

// Import utils
import BrowserStorageUtils from "../utils/browser_storage";
import { clientForChain } from "../utils/algod";
import { getAccountInformation } from "../utils/account";

const CHAIN_TYPES = {
  TESTNET: {
    id: 416002,
    name: "testnet",
  },
};

const peraWallet = new PeraWalletConnect({
  compactMode: true,
  chainId: CHAIN_TYPES.TESTNET.id,
});

const peraOnRamp = new PeraOnramp({
  optInEnabled: true,
});

export function useWallet() {
  const { toast } = useToast();
  const { updateIsConnect, updateAddress, updateAccountDetails, resetAccount } =
    useAccountActions();

  /**
   * Properties
   * - address
   * - balance
   * - isConnected
   */
  const account = useSelector((state) => state.account);

  return {
    account,
    peraWallet,
    peraOnRamp,
    async connect() {
      if (account.address) {
        toast({
          title: "Pera Wallet",
          description: "Connect to wallet successfully",
        });
        return;
      }

      try {
        const connectedAccounts = await peraWallet.connect();
        const details = await getAccountInformation(
          "testnet",
          connectedAccounts[0]
        );
        updateAddress(connectedAccounts[0]);
        updateAccountDetails(details);
      } catch (e) {
        console.log(e);
        toast({
          title: "Error - Connect to Pera Wallet",
          description: e.message,
        });
      }
    },

    async disconnect() {
      try {
        await peraWallet.disconnect();
        resetAccount();
      } catch (e) {
        console.log(e);
        toast({
          title: "Error - Disconnect to Pera Wallet",
          description: e.message,
        });
      }
    },

    async signAndSubmitTransaction({ signer, data }) {
      try {
        // Generate params
        const params = await clientForChain(CHAIN_TYPES.TESTNET.name)
          .getTransactionParams()
          .do();

        // Create transaction
        const txn = algosdk.makeApplicationCallTxnFromObject({
          from: signer,
          appIndex: Number(import.meta.env.VITE_APP_INDEX),
          suggestedParams: params,
        });
        // const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        //   from: signer,
        //   to: "",
        //   amount: 1,
        //   suggestedParams: params,
        // });

        // Create transaction groups
        const txGroups = [{ txn, signers: [signer] }];

        // Sign transaction groups
        const signedTxnGroup = await peraWallet.signTransaction([txGroups]);

        // Submit transaction
        const { txId } = await clientForChain(CHAIN_TYPES.TESTNET.name)
          .sendRawTransaction(signedTxnGroup)
          .do();

        return txId;
      } catch (error) {
        console.error("Sign and Submit Transaction:", error);
      }
    },

    async waitTransaction(txId, waitRounds = 1) {
      try {
        const result = await algosdk.waitForConfirmation(
          clientForChain(CHAIN_TYPES.TESTNET.name),
          txId,
          waitRounds
        );

        return result;
      } catch (error) {
        console.error("Wait Transaction:", error);
      }
    },
  };
}
