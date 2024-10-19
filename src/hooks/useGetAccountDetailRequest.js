import React from "react";

// Import commponents
import { useToast } from "../components/shared/use-toast";

// Import hooks
import { useAsyncProcess } from "./useAsyncProcess";

// Import utils
import { getAccountInformation } from "../utils/account";

export function useGetAccountDetailRequest({ chain, accountAddress }) {
  const {
    state: accountInformationState,
    runAsyncProcess: runGetAccountInformationAsyncProcess,
  } = useAsyncProcess();
  const { toast } = useToast();

  const refetchAccountDetail = React.useCallback(() => {
    if (chain && accountAddress) {
      try {
        runGetAccountInformationAsyncProcess(
          getAccountInformation(chain, accountAddress)
        );
      } catch (error) {
        toast({
          title: "Error - Get Account Details",
          description: error.message,
        });
      }
    }
  }, [
    accountAddress,
    chain,
    displayToast,
    runGetAccountInformationAsyncProcess,
  ]);

  React.useEffect(() => {
    refetchAccountDetail();
  }, [refetchAccountDetail]);

  return {
    accountInformationState,
    refetchAccountDetail,
  };
}
