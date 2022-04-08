import { handleAccounts } from "./useAccounts";
import { handleNetwork } from "./useNetwork";

export const setUpHooks = (web3, provider) => {
    return{
        useAccount: handleAccounts(web3, provider),
        useNetwork: handleNetwork(web3, provider),
    }
}
