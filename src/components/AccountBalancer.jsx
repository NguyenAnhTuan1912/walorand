import { getAccountBalanceText } from "../utils/account";
import { getWalletDetailsFromStorage } from "../utils/storage";
import { truncateAccountAddress } from "../utils/string";

function AccountBalance({ accountInformation, chain }) {
  const walletDetails = getWalletDetailsFromStorage();

  return (
    <div>
      <div className={"app__account-address"}>
        <b className={"app__text-purple"}>{"Connected to: "}</b>

        {truncateAccountAddress(accountInformation.address)}
      </div>

      <div className={"app__account-address"}>
        <b className={"app__text-purple"}>{"Chain: "}</b>

        {chain.toUpperCase()}
      </div>

      <div className={"app__account-address"}>
        <b className={"app__text-purple"}>{"Wallet Type: "}</b>

        {walletDetails?.type}
      </div>

      {accountInformation && (
        <div className={"app__account-address"}>
          <b className={"app__text-purple"}>{"Balance: "}</b>

          {getAccountBalanceText(accountInformation)}
        </div>
      )}
    </div>
  );
}

export default AccountBalance;
